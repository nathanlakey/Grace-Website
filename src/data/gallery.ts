import groundbreaking2 from '../assets/photos/groundbreaking-2.jpg';
import deskGavel from '../assets/photos/desk-gavel.jpeg';
import headshot1 from '../assets/photos/headshot-1.jpeg';

export interface GalleryPhoto {
	kind: 'photo';
	src: ImageMetadata;
	alt: string;
	objectPosition: string;
}

export interface GalleryPlaceholder {
	kind: 'placeholder';
	label: string;
}

export const galleryPhotos: (GalleryPhoto | GalleryPlaceholder)[] = [
	// TODO: Replace this Thinkery stage placeholder with a kind: 'photo' entry
	// containing the imported image, alt text, and objectPosition.
	{ kind: 'placeholder', label: 'photo coming soon' },
	{
		kind: 'photo',
		src: deskGavel,
		alt: 'Grace Lakey at a laptop with her AuctionStream business partner Gracie',
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
		alt: 'Grace Lakey smiling in a black blazer and polka-dot top',
		objectPosition: 'center 25%',
	},
];
