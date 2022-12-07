import { formatSecondsAsCountdown } from './formatter';

/**
 *
 * @see https://davidwalsh.name/javascript-debounce-function
 *
 * @param {function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @returns Debounced function
 */
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

/**
 * Get Local Time Zone String
 *
 * @returns string Local Time Zone String
 */
export function getTimezoneString() {
	const d      = new Date();
	const diff   = d.getTimezoneOffset();
	const offset = ( diff < 0 ) ? diff - ( diff * 2 ) : diff;

	const formatted = formatSecondsAsCountdown( offset );

	if ( diff === 0 ) {
		return formatted;
	}

	return ( diff < 0 ) ? formatted : '-' + formatted;
}

export function generateFileNameFromBlob( blob ) {
	if ( ! blob instanceof Blob ) {
		return '';
	}

	const type = blob.type.match( /^[\w]+\/[\w]+/ );
	const ext = ( type ) ? type[0].replace( /^[\w]+\//, '' ) : '';

	return Date.now() + '.' + ext;
}

export function makeid( length ) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export function find( keyChain, data, defaultData ) {
	if ( ! keyChain ) {
        return defaultData;
    }

    if ( ! keyChain.includes( '.' ) ) {
		return data?.[keyChain];
    }

    return keyChain
        .split('.')
        .map((key) => key.trim())
        .reduce((data, key) => data?.[key], data);
};

export function decodeHTMLEntities(text) {
	let textArea = document.createElement('textarea');
	textArea.innerHTML = text;

	return textArea.value;
}

export function encodeHTMLEntities(text) {
	let textArea = document.createElement('textarea');
	textArea.innerText = text;
	let encodedOutput=textArea.innerHTML;
	let arr=encodedOutput.split('<br>');
	encodedOutput=arr.join('\n');
	return encodedOutput;
}
export function parseOptionValue( value, options ) {
	const selectedOptions = options.filter( item => `${value}` === `${item.value}` );
	return ( selectedOptions.length ) ? selectedOptions[0] : '';
};
