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

	return ( diff < 0 ) ? formatted : '-' + formatted;
}
