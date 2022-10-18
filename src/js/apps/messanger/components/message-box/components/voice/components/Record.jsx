import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg'
import { RecorderWrap } from '../Style';
import permissionImg from 'Assets/img/chatbox/permission.png';
import play from 'Assets/svg/icons/play.svg';
import pause from 'Assets/svg/icons/pause.svg';
import previewBg from 'Assets/img/builder/bg.png';
import { useEffect } from 'react';

// import {
//     updateFormData as updateAttachmentFormData,
//     submitForm as submitAttachmentForm,
// } from '../../../../../store/forms/attachment/actionCreator';

// import { updateFormData as updateMessengerFormData } from '../../../../../store/forms/messenger/actionCreator';
// import { changeChatScreen } from '../../../../../store/chatbox/actionCreator';
// import screenTypes from '../../../../../store/chatbox/screenTypes';
// import messageTypes from '../../../../../store/forms/messenger/messageTypes';
import { formatSecondsAsCountdown } from 'Helper/formatter';

function Record() {
    const audioRef = useRef();
    const dispatch = useDispatch();

    const { attachmentForm } = useSelector((state) => {
        return {
            attachmentForm: state.attachmentForm,
        };
    });

    const stages = {
        PERMISSION: 'permission',
        RECORD: 'record',
        BEFORE_SEND: 'before_send',
        UPLOADING: 'uploading',
        UPLOAD_FAILED: 'upload_failed',
    };

    const [permissionDenied, setPermissionDenied] = useState(stages.RECORD);
    const [currentStage, setCurrentStage] = useState(stages.RECORD);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const [recordedAudioURL, setRecordedAudioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);
    const [recordedTimeInSecond, setRecordedTimeInSecond] = useState(0);

    // Init State
    // useState(function () {
    //     check_if_need_permission().then(function (is_needed_permission) {
    //         if (is_needed_permission) {
    //             setCurrentStage(stages.PERMISSION);
    //         }
    //     });
    // }, []);

    // On Upload Complete
    // useEffect(
    //     function () {
    //         if (true === attachmentForm.status) {
    //             // Update Messenger Form Data
    //             dispatch(
    //                 updateMessengerFormData({
    //                     message_type: messageTypes.AUDIO,
    //                     attachment_id: attachmentForm.uploadedAttachment.id,
    //                 })
    //             );

    //             // Switch to Contact form
    //             dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
    //         } else if (false === attachmentForm.status) {
    //             setCurrentStage(stages.UPLOAD_FAILED);
    //         }
    //     },
    //     [attachmentForm.status]
    // );

    // check_if_need_permission
    // async function check_if_need_permission() {
    //     try {
    //         const permission = await navigator.permissions.query({
    //             name: 'microphone',
    //         });

    //         return permission.state !== 'granted';
    //     } catch (_) {
    //         return true;
    //     }
    // }

    // requestPermission
    // async function requestPermission() {
    //     try {
    //         await navigator.mediaDevices.getUserMedia({
    //             audio: {
    //                 echoCancellation: true,
    //                 noiseSuppression: true,
    //                 sampleRate: 44100,
    //             },
    //         });

    //         setCurrentStage(stages.RECORD);
    //     } catch (error) {
    //         console.log({ error });

    //         setPermissionDenied(true);
    //     }
    // }

    // startRecording
    async function startRecording() {
        setCurrentStage(stages.BEFORE_SEND);
        // try {
        //     window.wpwaxCSAudioStream =
        //         await navigator.mediaDevices.getUserMedia({
        //             audio: {
        //                 echoCancellation: true,
        //                 noiseSuppression: true,
        //                 sampleRate: 44100,
        //             },
        //         });

        //     window.wpwaxCSRecorder = new RecordRTC(window.wpwaxCSAudioStream, {
        //         type: 'audio',
        //         mimeType: 'audio/wav',
        //         recorderType: RecordRTC.StereoAudioRecorder,
        //         disableLogs: true,
        //     });

        //     window.wpwaxCSRecorder.startRecording();

        //     setRecordedTimeInSecond(0);
        //     setIsRecording(true);
        //     startTimer();
        // } catch (error) {
        //     console.log({ error });

        //     setIsRecording(false);
        // }
    }

    // stopRecording
    // function stopRecording() {
    //     stopTimer();
    //     window.wpwaxCSRecorder.stopRecording(function (url) {
    //         let blob = window.wpwaxCSRecorder.getBlob();

    //         window.wpwaxCSAudioStream
    //             .getTracks()
    //             .forEach((track) => track.stop());

    //         setRecordedAudioBlob(blob);
    //         setRecordedAudioURL(url);
    //         setIsRecording(false);
    //         setCurrentStage(stages.BEFORE_SEND);
    //     });
    // }

    // function startTimer() {
    //     window.wpwaxCSAudioTimer = setInterval(function () {
    //         setRecordedTimeInSecond(function (currentValue) {
    //             return currentValue + 1;
    //         });
    //     }, 1000);
    // }

    // function stopTimer() {
    //     clearInterval(window.wpwaxCSAudioTimer);
    // }

    // togglePlayPauseAudio
    // function togglePlayPauseAudio() {
    //     if (audioRef.current.paused) {
    //         setIsPlayingPreview(true);
    //         audioRef.current.play();
    //     } else {
    //         audioRef.current.pause();
    //         setIsPlayingPreview(false);
    //     }
    // }

    // function sendAudio() {
    //     setCurrentStage(stages.UPLOADING);

    //     const formData = {
    //         file: recordedAudioBlob,
    //     };

    //     dispatch(updateAttachmentFormData(formData));
    //     dispatch(submitAttachmentForm(formData));
    // }

    // function prepareRecordAgain(e) {
    //     e.preventDefault();

    //     setRecordedTimeInSecond(0);
    //     setIsRecording(false);
    //     setCurrentStage(stages.RECORD);
    // }
    console.log(currentStage)
    if (currentStage === stages.PERMISSION) {
        return (
            <RecorderWrap className='wpwax-vm-record-staging'>
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
        return (
            <RecorderWrap className='wpwax-vm-record-staging'>
                <span
                    className={
                        isRecording
                            ? 'wpwax-vm-timer wpwax-vm-timer-start'
                            : 'wpwax-vm-timer'
                    }
                >
                    <span className='wpwax-vm-sec'>
                        {formatSecondsAsCountdown(recordedTimeInSecond)}
                    </span>
                </span>
                <div className='wpwax-vm-record-staging__bottom'>
                    {!isRecording ? (
                        <p>
                            Tap to{' '}
                            <span className='wpwax-vm-highlighted'>Start</span>{' '}
                            recording!
                        </p>
                    ) : (
                        ''
                    )}
                    <div
                        className={
                            !isRecording
                                ? 'wpwax-vm-record-staging__bottom--action'
                                : 'wpwax-vm-record-staging__bottom--action wpwax-vm-record-start'
                        }
                    >
                        <a
                            href='#'
                            className='wpwax-vm-record-btn'
                            onClick={() => startRecording()}
                        ></a>
                        <a
                            href='#'
                            className='wpwax-vm-pause-btn'
                            onClick={() => stopRecording()}
                        ></a>
                        <a href='#' className='wpwax-vm-btn-close'>
                            x
                        </a>
                    </div>
                </div>
            </RecorderWrap>
        );
    } else if (currentStage === stages.BEFORE_SEND) {
        return (
            <RecorderWrap>
                <div className=''>
                    {/* <audio
                        ref={audioRef}
                        src={recordedAudioURL}
                        onPlay={() => setIsPlayingPreview(true)}
                        onPause={() => setIsPlayingPreview(false)}
                        onEnded={() => setIsPlayingPreview(false)}
                    ></audio> */}
                </div>

                <div className='wpwax-vm-record-ready__top'>
                    <div
                        className='wpwax-vm-recorded-preview wpax-vm-preview-bg'
                        style={{ backgroundImage: `url("${previewBg}")` }}
                    ></div>
                    <a
                        href='#'
                        // onClick={togglePlayPauseAudio}
                        className='wpwax-vm-recorded-play'
                    >
                        <ReactSVG src={isPlayingPreview ? pause : play} />
                    </a>
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
            <RecorderWrap>
                <div className='wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
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
            <RecorderWrap>
                <div className='wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
                    <div className='wpwax-vm-record-send-progress__content'>
                        <div className='wpwax-vm-text-center'>
                            <p className='wpwax-vm-danger-text wpwax-vm-mb-20'>
                                Couldn't upload the video, please try again.
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
