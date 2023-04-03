export const resolutions = {
	360: { width: 640, height: 360 },
	480: { width: 640, height: 480 },
	720: { width: 1280, height: 720 }
};

export function getLabel( resulation ) {
	const hd = ( resulation.hdKey ) ? ` (${resulation.hdKey})` : '';
	return `${resulation.height}p${hd}: ${resulation.width}x${resulation.height}`;
}

export function parseOption( key ) {

	if ( typeof resolutions[ key ] === 'undefined' ) {
		return { value: '', label: '' };
	}

	return { value: parseInt( key ), label: getLabel( resolutions[ key ] ) };
};

export const options = Object.keys( resolutions ).map( parseOption ).reverse();