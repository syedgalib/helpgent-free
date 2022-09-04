function formatTimeAsCountdown( timeInSecond ) {
    return ( ! isNaN( timeInSecond ) ) ? new Date( timeInSecond * 1000).toISOString().substring(14, 19) : '00:00';
}

function formatSecondsAsCountdown(timeInSecond) {
	let second = timeInSecond % 60;
	second = second < 10 ? '0' + second : second;

	let min = (timeInSecond - second) / 60;
	min = min < 10 ? '0' + min : min;

	return `${min}:${second}`;
}

export { formatSecondsAsCountdown, formatTimeAsCountdown }