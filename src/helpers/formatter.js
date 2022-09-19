function formatTimeAsCountdown( timeInSecond ) {
    return ( ! isNaN( timeInSecond ) ) ? new Date( timeInSecond * 1000).toISOString().substring(14, 19) : '00:00';
}

function formatSecondsAsCountdown(timeInSecond) {
	const second = timeInSecond % 60;

	let fotmatted_second = parseInt( second );
	fotmatted_second = fotmatted_second < 10 ? '0' + fotmatted_second : fotmatted_second;

	let min = (timeInSecond - second) / 60;
	min = min < 10 ? '0' + min : min;

	return `${min}:${fotmatted_second}`;
}

export { formatSecondsAsCountdown, formatTimeAsCountdown }