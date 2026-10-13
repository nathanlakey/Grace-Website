import groundbreaking2 from '../assets/photos/groundbreaking-2.jpg';
import thinkery from '../assets/photos/gallery-thinkery.jpg';
import deskGavel from '../assets/photos/desk-gavel.jpeg';
import headshot1 from '../assets/photos/gallery-headshot-yellow.jpg';

export interface GalleryPhoto {
	kind: 'photo';
	src: ImageMetadata;
	alt: string;
	objectPosition: string;
}

export const galleryPhotos: GalleryPhoto[] = [
	{
		kind: 'photo',
		src: thinkery,
		alt: 'Grace Lakey speaking into a microphone in front of the Thinkery sign and a wall of greenery',
		objectPosition: 'center 45%',
	},
	{
		kind: 'photo',
		src: deskGavel,
		alt: 'Grace at a desk with her laptop and business partner, holding an auction gavel.',
		objectPosition: 'center 40%',
	},
	{
		kind: 'photo',
		src: groundbreaking2,
		alt: 'Grace Lakey holding a shovel at a groundbreaking ceremony with white tents and a crowd behind her',
		objectPosition: 'center 40%',
	},
	{
		kind: 'photo',
		src: headshot1,
		alt: 'Grace Lakey smiling in a black blazer and polka-dot top against a yellow background',
		objectPosition: 'center',
	},
];
