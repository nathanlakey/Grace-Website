export interface BioLink {
	label: string;
	url: string;
	newTab: boolean;
}

export const links: BioLink[] = [
	{ label: 'book grace for your event', url: '/#book', newTab: false },
	// TODO: replace with Grace's shopping URL.
	{ label: 'shop my looks', url: 'https://example.com/shop', newTab: true },
	// TODO: replace with Grace's Whatnot live URL.
	{ label: 'watch me live', url: 'https://www.whatnot.com/user/TODO', newTab: true },
	{ label: 'my story', url: '/#about', newTab: false },
	{ label: 'bring me to your stage', url: '/#speaking', newTab: false },
	// TODO: replace with Grace's auctioneer training URL.
	{ label: 'learn to auctioneer', url: 'https://example.com/learn', newTab: true },
];
