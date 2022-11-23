import { useRef, useState } from "react";
import Countdown from 'Components/Countdown.jsx';

export default function useCountdown( config ) {

	const [ count, setCount ] = useState( 0 );
	const [ isActiveCountdown, setIsActiveCountdown ] = useState( false );
	const countdownTimer = useRef();

	const defaultConfig = {
		countdownLength: 3,
	};

	config = ( config && typeof config === 'object' ) ? { ...defaultConfig, ...config } : defaultConfig;

	async function startCountdown() {
		setIsActiveCountdown( true );
		startTimer();

		await delay( config.countdownLength + 1 );

		stopTimer();
		setIsActiveCountdown( false );
	}

	async function stopCountdown() {
		stopTimer();
		setIsActiveCountdown( false );
	}

	function startTimer() {
		countdownTimer.current = setInterval(function () {
			setCount(function (currentValue) {
				return currentValue + 1;
			});
		}, 1000);
	}

	function stopTimer() {
		setCount( 0 );
        clearInterval( countdownTimer.current );
    }

	function delay( seconds ) {
		return new Promise(
			resolve => {
				setTimeout( () => resolve() , seconds * 1000 );
			}
		);
	}

	function getReverseCount() {
		return ( config.countdownLength - count );
	}

	return {
		count,
		isActiveCountdown,
		startCountdown,
		stopCountdown,
		CountdownPage: Countdown,
		getReverseCount,
	}
}