import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { bookingFields, type FormField } from '../../data/bookingForm.ts';

export const prerender = false;

const REQUIRED_TEXT_FIELDS = ['name', 'email', 'organization'] as const;
const MIN_SUBMIT_SECONDS = 3;

function escapeHtml(value: string) {
	return value.replace(/[&<>"']/g, (character) => {
		switch (character) {
			case '&': return '&amp;';
			case '<': return '&lt;';
			case '>': return '&gt;';
			case '"': return '&quot;';
			default: return '&#39;';
		}
	});
}

function answerLabel(field: FormField, value: unknown): string {
	if (typeof value === 'boolean') return value ? 'Yes' : 'No';
	if (Array.isArray(value)) {
		return value.map((answer) => answerLabel(field, answer)).join(', ') || 'Not provided';
	}
	if (typeof value !== 'string' || value.trim() === '') return 'Not provided';
	return field.options?.find((option) => option.id === value)?.label ?? value;
}

function jsonResponse(body: unknown, status: number) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json' },
	});
}

export const POST: APIRoute = async ({ request }) => {
	const contentType = request.headers.get('content-type') ?? '';
	if (!contentType.includes('application/json')) {
		return jsonResponse({ ok: false, error: 'Expected a JSON request body.' }, 400);
	}

	let body: Record<string, unknown>;
	try {
		body = await request.json();
	} catch {
		return jsonResponse({ ok: false, error: 'Invalid JSON body.' }, 400);
	}

	// --- Spam protection ---
	// Honeypot: real visitors never see or fill this field; bots often do.
	const honeypot = typeof body.company_website === 'string' ? body.company_website.trim() : '';

	// Timing: real visitors need at least a few seconds to read and fill the form.
	const pageLoadedAt = typeof body.page_loaded_at === 'number' ? body.page_loaded_at : null;
	const elapsedSeconds = pageLoadedAt !== null ? (Date.now() - pageLoadedAt) / 1000 : Infinity;

	if (honeypot !== '' || elapsedSeconds < MIN_SUBMIT_SECONDS) {
		// Report success without processing anything, so bots don't learn they were caught.
		return jsonResponse({ ok: true }, 200);
	}

	// --- Required field validation ---
	const missingFields: string[] = [];

	for (const field of REQUIRED_TEXT_FIELDS) {
		const value = body[field];
		if (typeof value !== 'string' || value.trim() === '') {
			missingFields.push(field);
		}
	}

	const services = Array.isArray(body.services)
		? body.services.filter((service): service is string => typeof service === 'string')
		: [];
	if (services.length === 0) {
		missingFields.push('services');
	}

	if (missingFields.length > 0) {
		return jsonResponse(
			{
				ok: false,
				error: 'Please fill in all required fields.',
				fields: missingFields,
			},
			400
		);
	}

	// Vercel supplies runtime variables; Astro also loads .env for local development.
	const apiKey = process.env.RESEND_API_KEY ?? import.meta.env?.RESEND_API_KEY;
	const toEmail = process.env.BOOKING_TO_EMAIL ?? import.meta.env?.BOOKING_TO_EMAIL;
	if (!apiKey || !toEmail) {
		console.error('Booking email configuration is missing RESEND_API_KEY or BOOKING_TO_EMAIL.');
		return jsonResponse({ ok: false, error: 'Unable to send your inquiry. Please try again later.' }, 500);
	}

	const resend = new Resend(apiKey);
	const email = String(body.email).trim();
	const firstName = String(body.name).trim().split(/\s+/)[0];
	const serviceField = bookingFields.find((field) => field.id === 'services');
	const serviceLabels = services.map((service) =>
		serviceField?.options?.find((option) => option.id === service)?.label ?? service
	);
	const eventName = [body.event_name_type, body.conference_name]
		.find((value) => typeof value === 'string' && value.trim() !== '');
	const subject = `Booking inquiry: ${serviceLabels.join(' + ')}${typeof eventName === 'string' ? `, ${eventName.trim()}` : ''}`;
	const answers = bookingFields.map((field) => ({
		label: field.label,
		answer: answerLabel(field, body[field.id]),
	}));
	const html = `<table cellpadding="8" cellspacing="0" border="1" style="border-collapse:collapse;text-align:left">${answers
		.map(({ label, answer }) =>
			`<tr><th scope="row" style="vertical-align:top">${escapeHtml(label)}</th><td style="white-space:pre-wrap">${escapeHtml(answer)}</td></tr>`
		).join('')}</table>`;

	try {
		const { error } = await resend.emails.send({
			from: 'Grace Lakey Website <bookings@gracelakey.com>',
			to: toEmail,
			replyTo: email,
			subject,
			html,
			text: answers.map(({ label, answer }) => `${label}: ${answer}`).join('\n'),
		});
		if (error) throw error;
	} catch (error) {
		console.error('Booking inquiry email failed:', error);
		return jsonResponse({ ok: false, error: 'Unable to send your inquiry. Please try again later.' }, 502);
	}

	const reply = `Hi ${firstName}, Thanks for reaching out. Your inquiry landed in my inbox and I'll be in touch within 2 business days to talk through your event. In the meantime, feel free to browse the gallery or come watch me sell live on Whatnot any week. Talk soon, Grace`;
	const signature = 'Grace Lakey\nAuctioneer | Emcee | Fundraising Consultant\ngracelakey.com';
	try {
		const { error } = await resend.emails.send({
			from: 'Grace Lakey <grace@gracelakey.com>',
			to: email,
			replyTo: 'grace@gracelakey.com',
			subject: 'Got your inquiry',
			html: `<p>${escapeHtml(reply)}</p><p>${escapeHtml(signature).replace(/\n/g, '<br>')}</p>`,
			text: `${reply}\n\n${signature}`,
		});
		if (error) throw error;
	} catch (error) {
		console.error('Booking auto-reply email failed:', error);
	}

	return jsonResponse({ ok: true }, 200);
};
