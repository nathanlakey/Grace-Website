import assert from 'node:assert/strict';
import { after, afterEach, beforeEach, mock, test } from 'node:test';
import { POST } from '../src/pages/api/booking.ts';
import { bookingFields } from '../src/data/bookingForm.ts';

const originalEnv = {
	RESEND_API_KEY: process.env.RESEND_API_KEY,
	BOOKING_TO_EMAIL: process.env.BOOKING_TO_EMAIL,
};
let messages;
let failures;
let errors;

beforeEach(() => {
	process.env.RESEND_API_KEY = 're_test_not_a_real_key';
	process.env.BOOKING_TO_EMAIL = 'inbox@example.com';
	messages = [];
	failures = [];
	errors = [];
	mock.method(console, 'error', (...args) => errors.push(args));
	mock.method(globalThis, 'fetch', async (url, options) => {
		assert.equal(String(url), 'https://api.resend.com/emails');
		messages.push(JSON.parse(options.body));
		const failure = failures.shift();
		if (failure === 'throw') throw new Error('Network unavailable');
		return new Response(JSON.stringify(failure
			? { name: 'validation_error', message: 'Send rejected' }
			: { id: `email-${messages.length}` }), { status: failure ? 422 : 200 });
	});
});

afterEach(() => mock.restoreAll());
after(() => {
	for (const [key, value] of Object.entries(originalEnv)) {
		if (value === undefined) delete process.env[key];
		else process.env[key] = value;
	}
});

function submit(overrides = {}, contentType = 'application/json') {
	return POST({
		request: new Request('https://gracelakey.com/api/booking', {
			method: 'POST',
			headers: { 'Content-Type': contentType },
			body: JSON.stringify({
				name: '  Jane Smith ',
				email: 'jane@example.com',
				organization: 'Example Foundation',
				services: ['auctioneering', 'emcee'],
				event_name_type: 'Spring Gala',
				page_loaded_at: Date.now() - 5000,
				company_website: '',
				...overrides,
			}),
		}),
	});
}

test('sends a labeled, escaped inquiry and the exact auto-reply', async () => {
	const response = await submit({
		attendance: '100_250',
		revenue_elements: ['live_auction', 'paddle_raise'],
		date_flexible: true,
		notes: '<script>alert("test")</script>\nA & B',
	});
	assert.equal(response.status, 200);
	assert.deepEqual(await response.json(), { ok: true });
	assert.equal(messages.length, 2);
	const [inquiry, reply] = messages;
	assert.equal(inquiry.from, 'Grace Lakey Website <bookings@gracelakey.com>');
	assert.equal(inquiry.to, 'inbox@example.com');
	assert.equal(inquiry.reply_to, 'jane@example.com');
	assert.equal(inquiry.subject, 'Booking inquiry: Auctioneering + Emcee & Event Hosting, Spring Gala');
	for (const field of bookingFields) assert.ok(inquiry.html.includes(field.label.replace(/&/g, '&amp;')));
	assert.ok(inquiry.html.includes('100–250'));
	assert.ok(inquiry.html.includes('Live auction, Paddle raise / mission moment'));
	assert.ok(inquiry.html.includes('Yes'));
	assert.ok(inquiry.html.includes('&lt;script&gt;alert(&quot;test&quot;)&lt;/script&gt;\nA &amp; B'));
	assert.ok(!inquiry.html.includes('<script>'));
	assert.ok(!inquiry.html.includes('page_loaded_at'));
	assert.ok(!inquiry.html.includes('company_website'));
	assert.equal(reply.from, 'Grace Lakey <grace@gracelakey.com>');
	assert.equal(reply.to, 'jane@example.com');
	assert.equal(reply.reply_to, 'grace@gracelakey.com');
	assert.equal(reply.subject, 'Got your inquiry');
	assert.equal(reply.text, "Hi Jane, Thanks for reaching out. Your inquiry landed in my inbox and I'll be in touch within 2 business days to talk through your event. In the meantime, feel free to browse the gallery or come watch me sell live on Whatnot any week. Talk soon, Grace\n\nGrace Lakey\nAuctioneer | Emcee | Fundraising Consultant\ngracelakey.com");
});

test('handles absent event names and keynote conference names', async () => {
	await submit({ event_name_type: '' });
	assert.equal(messages[0].subject, 'Booking inquiry: Auctioneering + Emcee & Event Hosting');
	await submit({ services: ['keynote'], event_name_type: '', conference_name: 'Conference' });
	assert.equal(messages[2].subject, 'Booking inquiry: Keynote Speaking, Conference');
});

test('preserves validation and spam checks without sending', async () => {
	assert.equal((await submit({}, 'text/plain')).status, 400);
	assert.equal((await submit({ name: '', email: '', organization: '', services: [] })).status, 400);
	assert.equal((await submit({ company_website: 'bot' })).status, 200);
	assert.equal((await submit({ page_loaded_at: Date.now() })).status, 200);
	const response = await POST({
		request: new Request('https://gracelakey.com/api/booking', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: '{',
		}),
	});
	assert.equal(response.status, 400);
	assert.equal(messages.length, 0);
});

test('fails explicitly when email configuration is missing', async () => {
	delete process.env.RESEND_API_KEY;
	delete process.env.BOOKING_TO_EMAIL;
	assert.equal((await submit()).status, 500);
	assert.equal(messages.length, 0);
	assert.equal(errors.length, 1);
});

for (const failure of [true, 'throw']) {
	test(`inquiry failure (${failure}) returns an error and skips auto-reply`, async () => {
		failures = [failure];
		const response = await submit();
		assert.equal(response.status, 502);
		assert.equal((await response.json()).ok, false);
		assert.equal(messages.length, 1);
		assert.equal(errors.filter(([message]) => message === 'Booking inquiry email failed:').length, 1);
	});

	test(`auto-reply failure (${failure}) logs but returns success`, async () => {
		failures = [false, failure];
		const response = await submit();
		assert.equal(response.status, 200);
		assert.deepEqual(await response.json(), { ok: true });
		assert.equal(messages.length, 2);
		assert.equal(errors.filter(([message]) => message === 'Booking auto-reply email failed:').length, 1);
	});
}
