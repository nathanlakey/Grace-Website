export interface FieldOption {
	id: string;
	label: string;
}

export type FieldType =
	| 'text'
	| 'email'
	| 'tel'
	| 'date'
	| 'checkbox'
	| 'checkboxes'
	| 'select'
	| 'radio'
	| 'textarea';

export interface FormField {
	id: string;
	label: string;
	type: FieldType;
	required: boolean;
	step: number;
	/** Grid width hint for the field layout; defaults to 'half' when omitted. */
	width?: 'half' | 'full';
	/** Placeholder text for text/textarea inputs. */
	placeholder?: string;
	/** For type 'checkboxes', 'radio', or 'select': the set of selectable options. */
	options?: FieldOption[];
	/** Only for type 'checkbox': the id of another field this checkbox disables when checked. */
	controlsFieldId?: string;
	/**
	 * Step 2 only: the `services` option ids that reveal this field. Omit for fields that
	 * are always shown on their step (e.g. everything on Step 1 and Step 3).
	 */
	services?: string[];
}

export const bookingFields: FormField[] = [
	// Step 1
	{ id: 'name', label: 'Name', type: 'text', required: true, step: 1 },
	{ id: 'email', label: 'Email', type: 'email', required: true, step: 1 },
	{ id: 'phone', label: 'Phone', type: 'tel', required: false, step: 1 },
	{ id: 'organization', label: 'Organization', type: 'text', required: true, step: 1 },
	{
		id: 'event_location',
		label: 'Event location (city, state)',
		type: 'text',
		required: false,
		step: 1,
	},
	{ id: 'event_date', label: 'Event date', type: 'date', required: false, step: 1 },
	{
		id: 'date_flexible',
		label: 'Our date is flexible / not set yet',
		type: 'checkbox',
		required: false,
		step: 1,
		controlsFieldId: 'event_date',
	},
	{
		id: 'services',
		label: 'What can I help with?',
		type: 'checkboxes',
		required: true,
		step: 1,
		width: 'full',
		options: [
			{ id: 'auctioneering', label: 'Auctioneering' },
			{ id: 'fundraising_strategy', label: 'Fundraising Strategy' },
			{ id: 'emcee', label: 'Emcee & Event Hosting' },
			{ id: 'keynote', label: 'Keynote Speaking' },
		],
	},

	// Step 2 — shown if Auctioneering or Fundraising Strategy is checked (also Emcee for the first two)
	{
		id: 'event_name_type',
		label: 'Event name and type',
		type: 'text',
		required: false,
		step: 2,
		placeholder: 'e.g. Spring Gala, annual fundraiser',
		services: ['auctioneering', 'fundraising_strategy', 'emcee'],
	},
	{
		id: 'attendance',
		label: 'Expected attendance',
		type: 'select',
		required: false,
		step: 2,
		services: ['auctioneering', 'fundraising_strategy', 'emcee'],
		options: [
			{ id: 'under_100', label: 'Under 100' },
			{ id: '100_250', label: '100–250' },
			{ id: '250_500', label: '250–500' },
			{ id: '500_plus', label: '500+' },
		],
	},
	{
		id: 'fundraising_goal',
		label: 'Fundraising goal',
		type: 'select',
		required: false,
		step: 2,
		services: ['auctioneering', 'fundraising_strategy'],
		options: [
			{ id: 'under_50k', label: 'Under $50k' },
			{ id: '50_150k', label: '$50–150k' },
			{ id: '150_500k', label: '$150–500k' },
			{ id: '500k_plus', label: '$500k+' },
			{ id: 'prefer_to_discuss', label: 'Prefer to discuss' },
		],
	},
	{
		id: 'worked_with_auctioneer',
		label: 'Have you worked with a professional benefit auctioneer before?',
		type: 'radio',
		required: false,
		step: 2,
		width: 'full',
		services: ['auctioneering', 'fundraising_strategy'],
		options: [
			{ id: 'yes', label: 'Yes' },
			{ id: 'no', label: 'No' },
			{ id: 'first_event', label: 'This is our first event' },
		],
	},
	{
		id: 'revenue_elements',
		label: 'Which revenue elements are you planning?',
		type: 'checkboxes',
		required: false,
		step: 2,
		width: 'full',
		services: ['auctioneering', 'fundraising_strategy'],
		options: [
			{ id: 'live_auction', label: 'Live auction' },
			{ id: 'paddle_raise', label: 'Paddle raise / mission moment' },
			{ id: 'silent_auction', label: 'Silent auction' },
			{ id: 'raffles_games', label: 'Raffles or games' },
			{ id: 'not_sure', label: "Not sure yet, that's why we're calling you" },
		],
	},
	{
		id: 'budget',
		label: 'Budget range for auctioneer services',
		type: 'select',
		required: false,
		step: 2,
		services: ['auctioneering', 'fundraising_strategy'],
		options: [
			{ id: 'under_2500', label: 'Under $2,500' },
			{ id: '2500_5000', label: '$2,500–5,000' },
			{ id: '5000_10000', label: '$5,000–10,000' },
			{ id: '10000_plus', label: '$10,000+' },
			{ id: 'not_sure', label: 'Not sure yet' },
		],
	},

	// Step 2 — shown if Emcee & Event Hosting is checked
	{
		id: 'program_length',
		label: 'Program length',
		type: 'select',
		required: false,
		step: 2,
		services: ['emcee'],
		options: [
			{ id: 'under_2h', label: 'Under 2 hours' },
			{ id: '2_3h', label: '2–3 hours' },
			{ id: '3_4h', label: '3–4 hours' },
			{ id: 'multi_day', label: 'Multi-day' },
		],
	},

	// Step 2 — shown if Keynote Speaking is checked
	{
		id: 'conference_name',
		label: 'Event or conference name',
		type: 'text',
		required: false,
		step: 2,
		services: ['keynote'],
	},
	{
		id: 'session_format',
		label: 'Session format',
		type: 'checkboxes',
		required: false,
		step: 2,
		width: 'full',
		services: ['keynote'],
		options: [
			{ id: 'keynote_format', label: 'Keynote' },
			{ id: 'breakout', label: 'Breakout session' },
			{ id: 'panel', label: 'Panel' },
			{ id: 'luncheon', label: 'Luncheon talk' },
		],
	},
	{
		id: 'audience',
		label: 'Tell me about your audience',
		type: 'textarea',
		required: false,
		step: 2,
		width: 'full',
		placeholder: "Who's in the room, roughly how many, and what do they care about?",
		services: ['keynote'],
	},
	{
		id: 'topics',
		label: 'Which topics resonate? (check all that apply)',
		type: 'checkboxes',
		required: false,
		step: 2,
		width: 'full',
		services: ['keynote'],
		options: [
			{ id: 'personal_story', label: 'My personal story' },
			{ id: 'risk_taking', label: 'Risk-taking and entrepreneurship' },
			{ id: 'overcoming_obstacles', label: 'Overcoming obstacles' },
			{ id: 'women_in_industry', label: 'Women in male-dominated industries' },
			{ id: 'fundraising_strategy', label: 'Nonprofit fundraising strategy' },
			{ id: 'branding_marketing', label: 'Branding and marketing' },
		],
	},
	{
		id: 'interest',
		label: 'What interests you about working with me or my story?',
		type: 'textarea',
		required: false,
		step: 2,
		width: 'full',
		services: ['keynote'],
	},

	// Step 3 — everyone
	{
		id: 'notes',
		label: 'Anything else I should know?',
		type: 'textarea',
		required: false,
		step: 3,
		width: 'full',
	},
];
