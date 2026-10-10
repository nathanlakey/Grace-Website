import type { APIRoute } from 'astro';

export const prerender = false;

const REQUIRED_TEXT_FIELDS = ['name', 'email', 'organization'] as const;
const MIN_SUBMIT_SECONDS = 3;

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

	// Everything checks out. Log it for now; see the TODO below for what comes next.
	console.log('Booking inquiry received:', body);

	/*
	 * TODO: wire up Resend (https://resend.com) here instead of the console.log above.
	 *
	 * 1. Send an inquiry email to Grace (grace@gracelakey.com):
	 *    - Subject: `Booking inquiry: ${services.join(', ')}, ${body.event_name_type || 'event name not given'}`
	 *    - Body: a readable summary of every field in `body` (Step 1 contact/event info,
	 *      the Step 2 answers relevant to the selected services, and any Step 3 notes).
	 *
	 * 2. Send an auto-reply to the submitter (body.email):
	 *    - Subject: "Got your inquiry"
	 *    - Body: a short confirmation that Grace received the inquiry and will follow up
	 *      within 2 business days.
	 *
	 * Store the Resend API key in an environment variable (e.g. RESEND_API_KEY) read via
	 * `import.meta.env.RESEND_API_KEY`, and never commit the key to the repo.
	 */

	return jsonResponse({ ok: true }, 200);
};
