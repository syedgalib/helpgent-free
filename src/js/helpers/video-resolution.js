export const resolutions = {
	360: { width: 640, height: 360 },
	480: { width: 640, height: 480 },
	720: { width: 1280, height: 720 }
};

export function getLabel( resulation ) {
	const hd = ( resulation.hdKey ) ? ` (${resulation.hdKey})` : '';
	return `${resulation.height}p${hd}: ${resulation.width}x${resulation.height}`;
}