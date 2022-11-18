import { useEffect, useRef, useState } from "react";
import { formatSecondsAsCountdown } from "Helper/formatter";

export default function useVideoRecorder( config ) {

	const defaultConfig = {
		maxRecordLength: null,
		alertTimeBeforeStop: 10,
		resulation: null,
	};

	config = ( config && typeof config === 'object' ) ? { ...defaultConfig, ...config } : defaultConfig;

	const [ recorder, setRecorder ]             = useState( null );
	const [ stream, setStream ]                 = useState( null );
	const [ recordingTimer, setRecordingTimer ] = useState( null );

	const [ isRecording, setIsRecording ]           = useState( false );
	const [ permissionDenied, setPermissionDenied ] = useState( null );

	const [ recordedTimeInSecond, setRecordedTimeInSecond ] = useState( 0 );
	const [ recordedBlob, setRecordedBlob ]                 = useState( null );
	const [ recordedURL, setRecordedURL ]                   = useState( '' );

	const [ recordingIsGoingToStopSoon, setRecordingIsGoingToStopSoon ] = useState( false );

	const videoStreemRef = useRef();

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
				audio: true,
				video: true,
			})

			return true;
        } catch (error) {
            console.error({ error });
            setPermissionDenied(true);

			return false;
        }
    }

	function getResulation() {
		const resulations = {
			'360': {
				width: 640,
				height: 360,
			},
			'480': {
				width: 640,
				height: 480,
			},
			'720' : {
				width: 1280,
				height: 720,
			},
		};

		let videoQuality = 720;

		const configVideoQuality = config.resulation;

		if ( configVideoQuality && ! isNaN( configVideoQuality ) ) {
			videoQuality = `${configVideoQuality}`;
		}

		const videoQualityHasValidResulation = Object.keys( resulations ).includes( videoQuality );
		return ( videoQualityHasValidResulation ) ? resulations[ videoQuality ] : null;
	}

    async function setupStream() {
        try {
			const resulation = getResulation();

			let videoStreamConfig = {};

			if ( resulation ) {
				videoStreamConfig = {
					width: { ideal: resulation.width },
					height: { ideal: resulation.height },
				}
			}

            // Setup Screen Streem
            const newStream = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
					sampleRate: 44100,
				},
				video: {
					facingMode: 'user',
					...videoStreamConfig,
				},
			});

			setStream( newStream );

            const newRecorder = new RecordRTC( newStream, {
                type: 'video',
                mimeType: 'video/webm;codecs=vp9',
                recorderType: RecordRTC.MediaStreamRecorder,
                disableLogs: true,
            });

			setRecorder( newRecorder );

			if ( videoStreemRef.current.srcObject ) {
                videoStreemRef.current.srcObject
                    .getVideoTracks()
                    .forEach((track) => {
                        track.stop();
                        videoStreemRef.current.srcObject.removeTrack(track);
                    });
            }

            videoStreemRef.current.srcObject = newStream;
            videoStreemRef.current.play();

			return newRecorder;

        } catch (error) {
            console.error({ error });
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
    function stopRecording( args ) {

		const defaultArgs = { terminate: false };
		args = ( args && typeof args === 'object' ) ? { ...defaultArgs, ...args } : defaultArgs;

        stopTimer();
        recorder.stopRecording( function ( url ) {
            const blob = recorder.getBlob();

            stream.getTracks().forEach((track) => track.stop());

			setRecordingIsGoingToStopSoon( false );
            setRecordedBlob(blob);
            setRecordedURL(url);
            setIsRecording(false);

			if ( ! args.terminate ) {
				afterStopRecording( { blob, url } );
			}

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

		if ( isRecording ) {
			stopRecording( { terminate: true } );
		}

		if ( stream ) {
			stream.getTracks().forEach((track) => track.stop());
		}

		setIsRecording( false );
		setRecorder( null );
		setStream( null );
		setRecordingTimer( null );
		setRecordedTimeInSecond( 0 );
		setRecordedBlob( null );
		setRecordedURL( '' );
	}

	return {
		recorder,
		isRecording,
		permissionDenied,
		recordedTimeInSecond,
		recordedBlob,
		recordedURL,
		recordingIsGoingToStopSoon,
		videoStreemRef,
		hasPermission,
		requestPermission,
		setupStream,
		startRecording,
		stopRecording,
		getCountDown,
		reset,
	};

}