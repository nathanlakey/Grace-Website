import stageManheim1 from '../assets/photos/grace-stage-manheim-1.jpg';
import stageManheim2 from '../assets/photos/grace-stage-manheim-2.jpg';
import groundbreaking1 from '../assets/photos/groundbreaking-1.jpg';
import groundbreaking3 from '../assets/photos/groundbreaking-3.jpeg';
import deskGavel from '../assets/photos/desk-gavel.jpeg';
import headshot1 from '../assets/photos/headshot-1.jpeg';
import headshot2 from '../assets/photos/headshot-2.jpeg';
import headshot3 from '../assets/photos/headshot-3.jpeg';
import headshot5 from '../assets/photos/headshot-5.jpeg';
import headshot6 from '../assets/photos/headshot-6.jpeg';

export interface GalleryPhoto {
	src: ImageMetadata;
	alt: string;
}

export const galleryPhotos: GalleryPhoto[] = [
	{
		src: stageManheim1,
		alt: 'Grace Lakey speaking into a microphone on stage at a Manheim Dallas event, wearing a sparkly white blazer',
	},
	{
		src: stageManheim2,
		alt: 'Grace Lakey standing on stage with a microphone at a Manheim Dallas event',
	},
	{ src: groundbreaking1, alt: 'Grace Lakey at a groundbreaking ceremony' },
	{ src: headshot3, alt: 'Grace Lakey in a black blazer, studio portrait' },
	{ src: deskGavel, alt: 'Grace Lakey and her AuctionStream business partner at the desk' },
	{ src: headshot6, alt: 'Grace Lakey standing in a black suit against a light wall' },
	{ src: headshot1, alt: 'Grace Lakey smiling, studio portrait' },
	{ src: groundbreaking3, alt: 'Grace Lakey with a colleague at a groundbreaking ceremony' },
	{ src: headshot2, alt: 'Grace Lakey, studio portrait' },
	{ src: headshot5, alt: 'Grace Lakey, studio portrait' },
];

