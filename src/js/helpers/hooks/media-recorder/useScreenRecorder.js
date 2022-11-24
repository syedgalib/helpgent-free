import { useEffect, useRef, useState } from "react";
import { formatSecondsAsCountdown } from "Helper/formatter";

export default function useScreenRecorder( config ) {

	const defaultConfig = {
		maxRecordLength: null,
		alertTimeBeforeStop: 10,
	};

	config = ( config && typeof config === 'object' ) ? { ...defaultConfig, ...config } : defaultConfig;

	const [ isRecording, setIsRecording ]           = useState( false );
	const [ permissionDenied, setPermissionDenied ] = useState( null );

	const [ recordedTimeInSecond, setRecordedTimeInSecond ] = useState( 0 );
	const [ recordedScreenBlob, setRecordedScreenBlob ]     = useState( null );
	const [ recordedScreenURL, setRecordedScreenURL ]       = useState( '' );

	const recordingTimerRef = useRef();
	const recorderRef       = useRef();
	const screenStreamRef   = useRef();
	const audioStreamRef    = useRef();

	const [ recordingIsGoingToStopSoon, setRecordingIsGoingToStopSoon ] = useState( false );

	useEffect( () => {

		if ( ! config.maxRecordLength ) {
			return;
		}

		if ( reversedRecordedTimeInSecond() <= config.alertTimeBeforeStop ) {
			setRecordingIsGoingToStopSoon( true );
		}

		if ( recordedTimeInSecond >= config.maxRecordLength ) {
			stopRecording();
		}

	}, [ recordedTimeInSecond ] );

	// hasPermission
    async function hasPermission() {
        try {
            const microphonePermission = await navigator.permissions.query({
                name: 'microphone',
            });

			const status  = (
				microphonePermission.state === 'granted'
			);

            return status;
        } catch (_) {
            return false;
        }
    }

	// requestPermission
    async function requestPermission() {
        try {
			await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
				},
			})

			return true;
        } catch (error) {
            console.error({ error });
            setPermissionDenied(true);

			return false;
        }
    }

    async function setupStream() {
        try {
            // Setup Screen Streem
            screenStreamRef.current = await navigator.mediaDevices.getDisplayMedia({ video: true });

			// Setup Audio Streem
			audioStreamRef.current = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
				},
			});

			const newMixedStream = new MediaStream([
				...screenStreamRef.current.getTracks(),
				...audioStreamRef.current.getTracks(),
			]);

            recorderRef.current = new RecordRTC( newMixedStream, {
                type: 'video',
                mimeType: 'video/webm;codecs=vp9',
                recorderType: RecordRTC.MediaStreamRecorder,
                disableLogs: true,
				numberOfAudioChannels: 1,
            });

			// Stop Recording If Native Stop Sharing Button Is Pressed
			screenStreamRef.current.getVideoTracks()[0].onended = stopRecording;

			return recorderRef.current;

        } catch (error) {
            console.log({ error });
            setIsRecording( false );

			return false;
        }
    }

	// startRecording
    async function startRecording() {
		if ( ! recorderRef.current ) {
			return false;
		}

        await recorderRef.current.startRecording();

		setRecordingIsGoingToStopSoon( false );
        setRecordedTimeInSecond(0);
        setIsRecording(true);
        startTimer();

		return true;
    }

	// stopRecording
    function stopRecording() {
        stopTimer();

		const state = ( recorderRef.current ) ? recorderRef.current.getState() : 'inactive';

		if ( 'inactive' === state ) {
			if ( screenStreamRef.current ) {
				screenStreamRef.current.getTracks().forEach((track) => track.stop());
			}

			if ( audioStreamRef.current ) {
				audioStreamRef.current.getTracks().forEach((track) => track.stop());
			}

			recorderRef.current = null;

			setRecordedTimeInSecond(0);
			setIsRecording(false);

			afterStopRecording();
			return;
		}

        recorderRef.current.stopRecording(function (url) {
			const blob = recorderRef.current.getBlob();

            screenStreamRef.current.getTracks().forEach((track) => track.stop());
            audioStreamRef.current.getTracks().forEach((track) => track.stop());

			setRecordingIsGoingToStopSoon( false );
            setRecordedScreenBlob(blob);
            setRecordedScreenURL(url);
            setIsRecording(false);
			afterStopRecording( { blob, url } );
        });
    }

	function afterStopRecording( recordingData ) {
		if ( config && config.afterStopRecording && typeof config.afterStopRecording === 'function' ) {
			config.afterStopRecording( recordingData );
		}
	}

	function startTimer() {
        recordingTimerRef.current = setInterval(function () {
            setRecordedTimeInSecond(function (currentValue) {
                return currentValue + 1;
            });
        }, 1000);
    }

    function stopTimer() {
        clearInterval( recordingTimerRef.current );
    }

	function reversedRecordedTimeInSecond() {
		return ( config.maxRecordLength - recordedTimeInSecond );
	}

	function getCountDown() {

		if ( ! config.maxRecordLength || recordedTimeInSecond < 1 ) {
			return formatSecondsAsCountdown( recordedTimeInSecond );
		}

		return formatSecondsAsCountdown( reversedRecordedTimeInSecond() );
	}

	function reset() {
		recorderRef.current     = null;
		screenStreamRef.current = null;
		audioStreamRef.current  = null;

		setIsRecording( false );
		setRecordedTimeInSecond( 0 );
		setRecordedScreenBlob( null );
		setRecordedScreenURL( '' );
	}

	return {
		recorder: recorderRef.current,
		isRecording,
		permissionDenied,
		recordedTimeInSecond,
		recordedScreenBlob,
		recordedScreenURL,
		recordingIsGoingToStopSoon,
		hasPermission,
		requestPermission,
		setupStream,
		startRecording,
		stopRecording,
		getCountDown,
		reset,
	};

}