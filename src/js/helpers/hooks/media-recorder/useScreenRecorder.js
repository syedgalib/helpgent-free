import { useEffect, useState } from "react";
import { formatSecondsAsCountdown } from "Helper/formatter";

export default function useScreenRecorder( config ) {

	const defaultConfig = {
		maxRecordLength: null,
		alertTimeBeforeStop: 10,
	};

	config = ( config && typeof config === 'object' ) ? { ...defaultConfig, ...config } : defaultConfig;

	const [ recorder, setRecorder ]             = useState( null );
	const [ screenStream, setScreenStream ]     = useState( null );
	const [ audioStream, setAudioStream ]       = useState( null );
	const [ recordingTimer, setRecordingTimer ] = useState( null );

	const [ isRecording, setIsRecording ]           = useState( false );
	const [ permissionDenied, setPermissionDenied ] = useState( null );

	const [ recordedTimeInSecond, setRecordedTimeInSecond ] = useState( 0 );
	const [ recordedScreenBlob, setRecordedScreenBlob ]     = useState( null );
	const [ recordedScreenURL, setRecordedScreenURL ]       = useState( '' );

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
					sampleRate: 44100,
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
            const newScreenStream = await navigator.mediaDevices.getDisplayMedia({
				video: true,
			});

			setScreenStream( newScreenStream );

			// Setup Audio Streem
			const newAudioStream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44100,
				},
			});

			setAudioStream( newAudioStream );

			const newMixedStream = new MediaStream([
				...newScreenStream.getTracks(),
				...newAudioStream.getTracks(),
			]);

            const newRecorder = new RecordRTC( newMixedStream, {
                type: 'video',
                mimeType: 'video/webm;codecs=vp9',
                recorderType: RecordRTC.MediaStreamRecorder,
                disableLogs: true,
            });

			setRecorder( newRecorder );

			return newRecorder;

        } catch (error) {
            console.log({ error });
            setIsRecording( false );

			return false;
        }
    }

	// startRecording
    async function startRecording( recorder ) {
        await recorder.startRecording();

		setRecordingIsGoingToStopSoon( false );
        setRecordedTimeInSecond(0);
        setIsRecording(true);
        startTimer();
    }

	// stopRecording
    function stopRecording() {
        stopTimer();
        recorder.stopRecording(function (url) {
            const blob = recorder.getBlob();

            screenStream.getTracks().forEach((track) => track.stop());
            audioStream.getTracks().forEach((track) => track.stop());

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
        const timer = setInterval(function () {
            setRecordedTimeInSecond(function (currentValue) {
                return currentValue + 1;
            });
        }, 1000);

		setRecordingTimer( timer );
    }

    function stopTimer() {
        clearInterval( recordingTimer );
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
		setIsRecording( false );
		setRecorder( null );
		setScreenStream( null );
		setRecordingTimer( null );
		setRecordedTimeInSecond( 0 );
		setRecordedScreenBlob( null );
		setRecordedScreenURL( '' );
	}

	return {
		recorder,
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