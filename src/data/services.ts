export type ServiceColor = 'crimson' | 'mustard-light' | 'charcoal' | 'pink';

export interface Service {
	title: string;
	description: string[];
	bullets?: string[];
	color: ServiceColor;
}

export const services: Service[] = [
	{
		title: 'Auctioneering',
		color: 'crimson',
		description: [
			'This is the main event. Live auction, mission moment, raffle reveals, the whole show.',
			"A professional benefit auctioneer typically raises significantly more than a volunteer or celebrity emcee with a gavel. Here's why: I know when to slow down, when to push, when to double a package, and how to read bidders.",
		],
		bullets: [
			'Live auction and paddle raise / mission moment calling',
			'Pre-event consulting call with your committee + debrief',
			'Item lineup and ask-order consulting',
			'Day-of coordination with your emcee, AV team, and staff',
		],
	},
	{
		title: 'Emcee & Event Hosting',
		color: 'mustard-light',
		description: [
			'I keep programs moving, your speakers on time, and your guests engaged - auction or not.',
			"Luncheons, galas, award nights, donor appreciation events. If there's a mic and an agenda, I can run it.",
		],
		bullets: [
			'Full program hosting from welcome to send-off',
			'Script review and run-of-show input',
			'Speaker transitions, award presentations, live announcements',
		],
	},
	{
		title: 'Fundraising Strategy',
		color: 'charcoal',
		description: [
			"I consult with fundraising teams on the decisions that change the final number: what goes in the live auction vs. silent, how to structure your paddle raise levels, and how to program extra revenue moments like prize pulls, golden tickets, and raffles. I'll also help you elevate your run-of-show, reimagine the gala entirely if it's gone stale, and keep donors coming back next year.",
		],
		bullets: [
			'Strategy sessions before event',
			'Brainstorming revenue moments',
			'Auction item curation and package building',
			'Paddle raise structure and ask-level planning',
			'Post-event debrief so next year beats this year',
		],
	},
	{
		title: 'Keynote Speaking',
		color: 'pink',
		description: [
			"At 27, a DNA test I took for fun revealed that my dad wasn't my biological father. Many twists and turns later, that accidental discovery led me out of my stable corporate job, into the auction world, and eventually to building my own businesses from scratch.",
			"Now I tell that story from stages, and I tailor it to what your audience needs to hear: taking the risk, rebuilding after trauma, betting on yourself, or breaking into an industry where you're not who they expected.",
			'Keynotes, breakout sessions, panels, luncheons. If your audience needs a reason to bet on themselves, I have a few.',
		],
	},
];
