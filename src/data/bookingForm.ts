export interface FieldOption {
	id: string;
	label: string;
}

export type FieldType = 'text' | 'email' | 'tel' | 'date' | 'checkbox' | 'checkboxes';

export interface FormField {
	id: string;
	label: string;
	type: FieldType;
	required: boolean;
	step: number;
	/** Grid width hint for the field layout; defaults to 'half' when omitted. */
	width?: 'half' | 'full';
	/** Only for type 'checkboxes': the set of selectable options. */
	options?: FieldOption[];
	/** Only for type 'checkbox': the id of another field this checkbox disables when checked. */
	controlsFieldId?: string;
}

export const bookingFields: FormField[] = [
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
];
