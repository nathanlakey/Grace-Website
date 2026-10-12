export interface BioLink {
	label: string;
	url: string;
	newTab: boolean;
	sponsored?: boolean;
}

export const links: BioLink[] = [
	{ label: 'book grace for your event', url: '/#book', newTab: false },
	{
		label: 'shop my looks',
		url: 'https://mave.ly/gracelakey',
		newTab: true,
		sponsored: true,
	},
	{ label: 'watch me live', url: 'https://www.whatnot.com/s/MdfeWeHy', newTab: true },
	{ label: 'my story', url: '/#about', newTab: false },
	{ label: 'bring me to your stage', url: '/#services', newTab: false },
	{ label: 'learn to auctioneer', url: 'https://auctionacademy.com', newTab: true },
];
