import heroPhoto from '../assets/photos/hero-coral-block.png';

// Shared by the hero <Image> and the page-head preload so their URLs match.
export const heroImage = {
	src: heroPhoto,
	widths: [400, 646],
	sizes: '(min-width: 901px) 700px, min(100vw, 420px)',
	format: 'webp',
} as const;
