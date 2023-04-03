import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { RecorderWrap } from '../Style';
import permissionImg from 'Assets/img/chatbox/permission.png';
import play from 'Assets/svg/icons/play.svg';
import pause from 'Assets/svg/icons/pause.svg';
import audioRangeActive from 'Assets/svg/audio-active.svg';
import audioRangeInactive from 'Assets/svg/audio-inactive.svg';
import mic from 'Assets/svg/icons/mice.svg';
import pauseSolid from 'Assets/svg/icons/pause-solid.svg';
import crossSmall from 'Assets/svg/icons/cross-small.svg';
import arrowRight from 'Assets/svg/icons/arrow-small-right.svg';
import arrowLeft from 'Assets/svg/icons/arrow-small-left.svg';

import {
    updateFormData as updateAttachmentFormData,
    submitForm as submitAttachmentForm,
} from '../../../../../store/forms/attachment/actionCreator';

import { updateFormData as updateMessengerFormData } from '../../../../../store/forms/messenger/actionCreator';
import { changeChatScreen } from '../../../../../store/chatbox/actionCreator';
import screenTypes from '../../../../../store/chatbox/screenTypes';
import messageTypes from '../../../../../store/forms/messenger/messageTypes';
import { formatSecondsAsCountdown } from 'Helper/formatter';
import useChatboxController from '../../../hooks/useChatboxController';
import useCountdown from 'Hooks/useCountdown';
import { SECOND_IN_MILLISECONDS, MIN_IN_SECONDS } from 'Helper/const';

function Record() {
	// Hooks
	const {
		needToGoContactPage
	} = useChatboxController();

	const {
		isActiveCountdown,
		startCountdown,
		CountdownPage,
		getReverseCount,
	} = useCountdown();

	const { addAction } = wpwaxHooks;

    const audioRef = useRef();
    const dispatch = useDispatch();

	// Store States
    const { settings, attachmentForm } = useSelector((state) => {
        return {
			settings: state.settings.options,
            attachmentForm: state.attachmentForm,
        };
    });

    const stages = {
        HOME: 'home',
        PERMISSION: 'permission',
        RECORD: 'record',
        BEFORE_SEND: 'before_send',
        UPLOADING: 'uploading',
        UPLOAD_FAILED: 'upload_failed',
    };

	const [isInitializedBeforeCloseChatbox, setIsInitializedBeforeCloseChatbox] = useState(false);

    const [permissionDenied, setPermissionDenied] = useState(stages.RECORD);
    const [currentStage, setCurrentStage] = useState(stages.RECORD);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const [recordedAudioSteam, setRecordedAudioSteam] = useState(null);
    const [recordedAudioURL, setRecordedAudioURL] = useState('');
    const [audioCurrentTime, setAudioCurrentTime] = useState(0);
    const [audioDuration, setAudioDuration] = useState(0);
    const [isRecording, setIsRecording] = useState(false);
    const [ isRecordingPaused, setIsRecordingPaused ]   = useState( false );
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);
    const [recordedTimeInSecond, setRecordedTimeInSecond] = useState(0);

	const [maxRecordLength, setMaxRecordLength] = useState( 2 * MIN_IN_SECONDS );

    // Init State
    useState(function () {

		if ( settings && typeof settings.maxVoiceLength !== 'undefined' && ! isNaN( settings.maxVoiceLength ) ) {
			const maxVoiceLengthInSeconds = parseFloat( settings.maxVoiceLength ) * MIN_IN_SECONDS;
			setMaxRecordLength( maxVoiceLengthInSeconds );
		}

        check_if_need_permission().then(function (is_needed_permission) {
            if (is_needed_permission) {
                setCurrentStage(stages.PERMISSION);
            }
        });
    }, []);

	useEffect( () => {

		if ( ! maxRecordLength ) {
			return;
		}

		if ( recordedTimeInSecond >= maxRecordLength ) {
			stopRecording();
		}


	}, [ recordedTimeInSecond ] );

    // On Upload Complete
    useEffect(
        function () {
            if (true === attachmentForm.status) {
                // Update Messenger Form Data
                dispatch(
                    updateMessengerFormData({
                        message_type: messageTypes.AUDIO,
                        attachment_id: attachmentForm.uploadedAttachment.id,
                    })
                );

                // Navigate to Contact form or Sending Page
                setTimeout(() => {
					// Navigate to Contact form or Sending Page
					if ( needToGoContactPage() ) {
						dispatch( changeChatScreen( screenTypes.CONTACT_FORM) );
						return;
					}

					dispatch( changeChatScreen( screenTypes.SENDING ) );

                }, 2000);
            } else if (false === attachmentForm.status) {
                setCurrentStage(stages.UPLOAD_FAILED);
            }
        },
        [attachmentForm.status]
    );

    // check_if_need_permission
    async function check_if_need_permission() {
        try {
            const permission = await navigator.permissions.query({
                name: 'microphone',
            });

            return permission.state !== 'granted';
        } catch (_) {
            return true;
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
            });

            setCurrentStage(stages.RECORD);
        } catch (error) {
            console.log({ error });

            setPermissionDenied(true);
        }
    }

    // Toggle Recording
    async function handleStartRecording(e) {
        e.preventDefault();

		if ( ! isInitializedBeforeCloseChatbox ) {
			addAction( 'beforeCloseChatbox', handleStopRecording );
			setIsInitializedBeforeCloseChatbox( true );
		}

        // Start Countdown
        await startCountdown();
        setIsRecording(true);

        try {
            window.wpwaxCSAudioStream =
                await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                    },
                });

            window.wpwaxCSRecorder = new RecordRTC(window.wpwaxCSAudioStream, {
                type: 'audio',
                mimeType: 'audio/wav',
                recorderType: RecordRTC.StereoAudioRecorder,
                disableLogs: true,
                numberOfAudioChannels: 1,
            });
            window.wpwaxCSRecorder.startRecording();

            startTimer();
            setRecordedTimeInSecond(recordedTimeInSecond);
            setRecordedAudioSteam(window.wpwaxCSAudioStream);
        } catch (error) {
            console.log({ error });

            setIsRecording(false);
        }
        
    }

    const handleResumeRecording = (e) => {
        e.preventDefault();
        window.wpwaxCSRecorder.resumeRecording();
        setIsRecording(true);
        setIsRecordingPaused(false);
        startTimer();
    };

    const handlePauseRecording = (e) => {
        e.preventDefault();
        if (isRecording) {
            window.wpwaxCSRecorder.pauseRecording();
            setIsRecording(false);
            setIsRecordingPaused(true);
            stopTimer();
        }
    };

	// stopRecording
	function handleStopRecording () {
        setIsRecordingPaused(false);
		window.wpwaxCSRecorder.stopRecording(function (url) {
            let blob = window.wpwaxCSRecorder.getBlob();
            window.wpwaxCSAudioStream
                .getTracks()
                .forEach((track) => track.stop());

			setRecordedAudioSteam( null );
            setRecordedAudioBlob(blob);
            setRecordedAudioURL(url);
            setCurrentStage(stages.BEFORE_SEND);

			setRecordedTimeInSecond(0);
			setIsRecording(false);
            stopTimer();
        });
	};

	function reversedRecordedTimeInSecond() {
		return ( maxRecordLength - recordedTimeInSecond );
	}

	function getCountDown() {

		if ( ! maxRecordLength || recordedTimeInSecond < 1 ) {
			return formatSecondsAsCountdown( recordedTimeInSecond );
		}

		return formatSecondsAsCountdown( reversedRecordedTimeInSecond() );
	}

    // handle Send recording
    function handleSendRecording(e) {
        e.preventDefault();
        handleStopRecording()
    }

    function startTimer() {
        window.wpwaxCSAudioTimer = setInterval(function () {
            setRecordedTimeInSecond(function (currentValue) {
                return currentValue + 1;
            });
        }, SECOND_IN_MILLISECONDS );
    }

    function stopTimer() {
        clearInterval(window.wpwaxCSAudioTimer);
    }

    // togglePlayPauseAudio
    function togglePlayPauseAudio() {
        if (audioRef.current.paused) {
            setIsPlayingPreview(true);
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            setIsPlayingPreview(false);
        }
    }

    function sendAudio() {
        setCurrentStage(stages.UPLOADING);

        const formData = {
            file: recordedAudioBlob,
        };

        dispatch(updateAttachmentFormData(formData));
        dispatch(submitAttachmentForm(formData));
    }

    function prepareRecordAgain(e) {
        e.preventDefault();

        setRecordedTimeInSecond(0);
        setAudioDuration(0);
        setAudioCurrentTime(0);
        setIsRecording(false);
        setIsRecordingPaused(false);
        setCurrentStage(stages.RECORD);
        stopTimer();
    }

    const getPlayedTimeInPercent = () => {
        const r = audioCurrentTime / audioDuration;
        return isNaN(r) ? 0 : r * 100;
    };

    const getRightBtnContent = () => {
        if (isRecording || isRecordingPaused) {
            return (
                <a
                    href='#'
                    className={isRecordingPaused ? 'wpwax-vm-btn-record-right wpwax-vm-btn-play' : 'wpwax-vm-btn-record-right wpwax-vm-btn-pause'}
                    onClick={ isRecordingPaused ?  (e) => handleResumeRecording(e) : (e) => handlePauseRecording(e)}

                > {isRecordingPaused ? <ReactSVG src={mic} /> : <ReactSVG src={pauseSolid} />} </a>
            );
        } else if (isRecording && recordedTimeInSecond === 0) {
            return null;
        }
    };

    function handleBackScreen(event) {
        event.preventDefault();
		dispatch( changeChatScreen( screenTypes.HOME ) );
	}

    if (currentStage === stages.PERMISSION) {
        return (
            <RecorderWrap className='wpwax-vm-record-staging'>
                <a href="#" className="wpwax-vm-btn-back" onClick={handleBackScreen}><ReactSVG src={arrowRight} /></a>
                <h4 className='wpwax-video-screen-title'>
                    To record audio, your browser will need to request access to
                    your camera & microphone.
                </h4>
                <img src={permissionImg} alt='wpwax video support' />
                <a
                    href='#'
                    className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                    onClick={() => requestPermission()}
                >
                    Request Permission
                </a>

                {permissionDenied && (
                    <div className='wpwax-vm-mt-10 wpwax-vm-alert wpwax-vm-alert-danger'>
                        Please grant the requested permission
                    </div>
                )}
            </RecorderWrap>
        );
    } else if (currentStage === stages.RECORD) {

		if ( isActiveCountdown ) {
			return (
				<RecorderWrap className="wpwax-vm-record-staging">
					<CountdownPage count={getReverseCount()} />
				</RecorderWrap>
			);
		}

        return (
            <RecorderWrap className={isRecording || isRecordingPaused ? "wpwax-vm-record-staging wpwax-vm-record-start" : "wpwax-vm-record-staging"}>
                <a href="#" className="wpwax-vm-btn-back" onClick={e=>prepareRecordAgain(e)}><ReactSVG src={arrowRight} /></a>
                {
                    recordedTimeInSecond === 0 && !isRecording ? <a href="#" className="wpwax-vm-btn-back" onClick={handleBackScreen}><ReactSVG src={arrowRight} /></a> : null
                }

                <span
                    className={
                        isRecording
                            ? 'wpwax-vm-timer wpwax-vm-timer-start'
                            : 'wpwax-vm-timer'
                    }
                >
                    <span className='wpwax-vm-sec'>
                        {getCountDown()}
                    </span>
                </span>
                {/* {
                    isRecording ?
                    <WaveformVisualizer
                        audio={recordedAudioSteam}
                        // theme={WaveformVisualizerTheme.squaredBars}
                    /> : null
                } */}
                <div className='wpwax-vm-record-staging__bottom'>
					<div className='wpwax-vm-record-staging__bottom--action'>
                        <a
                            href='#'
                            className='wpwax-vm-record-btn'
                            onClick={ isRecording || isRecordingPaused ? (e) => handleSendRecording(e) : (e) => handleStartRecording(e)}
                        >
                            {
                                isRecording || isRecordingPaused ? null : <ReactSVG src={mic} />
                            }
                            
                        </a>
						{getRightBtnContent()}
					</div>
				</div>
            </RecorderWrap>
        );
    } else if (currentStage === stages.BEFORE_SEND) {
        return (
            <RecorderWrap className='wpwax-vm-record-ready'>
                <div className=''>
                    <audio
                        ref={audioRef}
                        src={recordedAudioURL}
                        onPlay={() => setIsPlayingPreview(true)}
                        onPause={() => setIsPlayingPreview(false)}
                        onEnded={() => setIsPlayingPreview(false)}
                        onTimeUpdate={(event) => {
                            setAudioCurrentTime(event.target.currentTime);
                        }}
                        onLoadedData={(event) => {
                            setAudioDuration(event.target.duration);
                        }}
                    ></audio>
                </div>

                <div className='wpwax-vm-record-ready__top'>
                    <a
                        href='#'
                        onClick={togglePlayPauseAudio}
                        className={
                            isPlayingPreview
                                ? 'wpwax-vm-recorded-pause wpwax-vm-recorded-btn'
                                : 'wpwax-vm-recorded-play wpwax-vm-recorded-btn'
                        }
                    >
                        <ReactSVG src={isPlayingPreview ? pause : play} />
                    </a>
                    {/* <WaveformVisualizer
                        audio={recordedAudioURL}
                        colors={['#009688', '#26a69a']}
                        backgroundColor="white"
                        // theme={WaveformVisualizerTheme.squaredBars}
                    /> */}
                    <span className='wpwax-vm-audio-range'>
                        <span
                            style={{
                                display: 'block',
                                position: 'relative',
                                margin: '5px',
                                width: '100%',
                                height: '60px',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    display: 'inline-block',
                                    backgroundPositionX: '0px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundImage:
                                        'url( ' + audioRangeInactive + ' )',
                                    zIndex: 0,
                                }}
                            ></span>
                            <span
                                style={{
                                    width: getPlayedTimeInPercent() + '%',
                                    position: 'absolute',
                                    left: 0,
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    display: 'inline-block',
                                    backgroundPositionX: '0px',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundImage:
                                        'url( ' + audioRangeActive + ' )',
                                    zIndex: 1,
                                    transition: 'all 300ms ease-in-out 0s',
                                }}
                            ></span>
                        </span>
                    </span>
                </div>
                <div className='wpwax-vm-record-ready__bottom'>
                    <h4>Ready to Send ?</h4>
                    <div className='wpwax-vm-record-ready__bottom--actions'>
                        <a
                            href='#'
                            onClick={(e) => {
                                sendAudio(e);
                            }}
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-mb-10 wpwax-vm-btn-block wpwax-vm-btn-primary'
                        >
                            Yes
                        </a>
                        <a
                            href='#'
                            onClick={(e) => {
                                prepareRecordAgain(e);
                            }}
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-light'
                        >
                            No
                        </a>
                    </div>
                </div>
            </RecorderWrap>
        );
    } else if (currentStage === stages.UPLOADING) {
        return (
            <RecorderWrap className='wpwax-vm-record-uuploading'>
                <div className='wpwax-vm-record-send-progress wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
                    <div className='wpwax-vm-record-send-progress__content'>
                        <div className='wpwax-vm-record-send-progress__bar'>
                            <span>Uploading</span>
                        </div>

                        <div className='wpwax-vm-text-center'>
                            <h4>We’re currently uploading your audio</h4>
                            <p className='wpwax-vm-danger-text wpwax-vm-text-danger'>
                                Please don’t leave this page!
                            </p>
                        </div>
                    </div>
                </div>
            </RecorderWrap>
        );
    } else if (currentStage === stages.UPLOAD_FAILED) {
        return (
            <RecorderWrap className='wpwax-vm-upload-faild'>
                <div className='wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
                    <div className='wpwax-vm-record-send-progress__content'>
                        <div className='wpwax-vm-text-center'>
                            <p className='wpwax-vm-danger-text wpwax-vm-mb-20'>
                                Couldn't upload the file, please try again.
                            </p>
                            <a
                                href='#'
                                onClick={(e) => prepareRecordAgain(e)}
                                className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                            >
                                Try Again
                            </a>
                        </div>
                    </div>
                </div>
            </RecorderWrap>
        );
    } else {
        return '';
    }
}

export default Record;
