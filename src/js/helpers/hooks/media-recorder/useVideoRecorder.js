import { useEffect, useRef, useState } from "react";
import { formatSecondsAsCountdown } from "Helper/formatter";
import { resolutions } from "Helper/video-resolution";

export default function useVideoRecorder( config ) {

	const defaultConfig = {
		maxRecordLength: null,
		alertTimeBeforeStop: 10,
		resolution: null,
	};

	config = ( config && typeof config === 'object' ) ? { ...defaultConfig, ...config } : defaultConfig;

	const [ isVideoRecording, setIsVideoRecording ]           	= useState( false );
	const [ isRecordingPaused, setIsRecordingPaused ]   = useState( false );
	const [ permissionDenied, setPermissionDenied ] 	= useState( null );

	const [ recordedTimeInSecond, setRecordedTimeInSecond ] = useState( 0 );
	const [ recordedBlob, setRecordedBlob ]                 = useState( null );
	const [ recordedURL, setRecordedURL ]                   = useState( '' );

	const [ recordingIsGoingToStopSoon, setRecordingIsGoingToStopSoon ] = useState( false );

	const recorderRef       = useRef();
	const streamRef         = useRef();
	const recordingTimerRef = useRef();
	const videoStreemRef    = useRef();

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
			});

			return true;
        } catch (error) {
            console.error({ error });
            setPermissionDenied(true);

			return false;
        }
    }

	function getResolution() {
		const configResolution   = config.resolution && ! isNaN( config.resolution ) ?  `${config.resolution}` : null;
		const selectedResulation = ( configResolution && Object.keys( resolutions ).includes( configResolution ) ) ? resolutions[ configResolution ] : null;

		return selectedResulation;
	}

    async function setupStream() {
        try {
			const resolution = getResolution();

			let videoStreamConfig = {};

			if ( resolution ) {
				videoStreamConfig = {
					width: { ideal: resolution.width },
					height: { ideal: resolution.height },
				}
			}

            // Setup Screen Streem
            streamRef.current = await navigator.mediaDevices.getUserMedia({
				audio: {
					echoCancellation: true,
					noiseSuppression: true,
				},
				video: {
					facingMode: 'user',
					...videoStreamConfig,
				},
			});


            recorderRef.current = new RecordRTC( streamRef.current, {
                type: 'video',
                mimeType: 'video/webm;codecs=vp9',
                recorderType: RecordRTC.MediaStreamRecorder,
                disableLogs: true,
				numberOfAudioChannels: 1,
            });

			if ( videoStreemRef.current.srcObject ) {
                videoStreemRef.current.srcObject
                    .getVideoTracks()
                    .forEach((track) => {
                        track.stop();
                        videoStreemRef.current.srcObject.removeTrack(track);
                    });
            }
            videoStreemRef.current.srcObject = streamRef.current;
            videoStreemRef.current.play();

			return recorderRef.current;

        } catch (error) {
            console.error({ error });
            setIsVideoRecording( false );

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
        setIsVideoRecording(true);
        startTimer();

		return true;
    }

	// stopRecording
    function stopRecording( args ) {

		setIsRecordingPaused(false);
		const defaultArgs = { terminate: false };
		args = ( args && typeof args === 'object' ) ? { ...defaultArgs, ...args } : defaultArgs;

        stopTimer();

		const state = ( recorderRef.current ) ? recorderRef.current.getState() : 'inactive';

		if ( 'inactive' === state ) {
			if ( streamRef.current ) {
				streamRef.current.getTracks().forEach((track) => track.stop());
			}

			recorderRef.current = null;

			setRecordedTimeInSecond(0);
			setIsVideoRecording(false);

			afterStopRecording();
			return;
		}

        recorderRef.current.stopRecording( function ( url ) {
            const blob = recorderRef.current.getBlob();

            streamRef.current.getTracks().forEach((track) => track.stop());

			setRecordingIsGoingToStopSoon( false );
            setRecordedBlob(blob);
            setRecordedURL(url);
            setIsVideoRecording(false);

			if ( ! args.terminate ) {
				afterStopRecording( { blob, url } );
			}

        });
    }

	// resumeRecording
    async function resumeRecording() {

		if ( ! recorderRef.current ) {
			return false;
		}

		await recorderRef.current.resumeRecording();
		setIsVideoRecording(true);
		setIsRecordingPaused(false);
		startTimer();
		
		return true;
    }

	// pauseRecording
    async function pauseRecording() {

		if ( ! recorderRef.current ) {
			return false;
		}

		if ( isVideoRecording ) {
            await recorderRef.current.pauseRecording();
            setIsVideoRecording(false);
            setIsRecordingPaused(true);
            stopTimer();
        }
		
		return true;
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
		if ( isVideoRecording ) {
			stopRecording( { terminate: true } );
		}

		if ( streamRef.current ) {
			streamRef.current.getTracks().forEach((track) => track.stop());
		}

		recorderRef.current       = null;
		streamRef.current         = null;
		recordingTimerRef.current = null;
		videoStreemRef.current    = null;

		setIsVideoRecording( false );
		setRecordedTimeInSecond( 0 );
		setRecordedBlob( null );
		setRecordedURL( '' );
	}

	return {
		recorder: recorderRef.current,
		isVideoRecording,
		isRecordingPaused,
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
		resumeRecording,
		pauseRecording,
		stopRecording,
		getCountDown,
		reset,
	};

}