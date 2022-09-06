import React, { useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { VideoRecordWrap } from '../Style';

/* Images */
import permissionImg from 'Assets/img/chatbox/permission.png';
import expander from 'Assets/svg/icons/expand.svg';
import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import {
    updateFormData as updateAttachmentFormData,
    submitForm as submitAttachmentForm,
} from '../../../../../store/forms/attachment/actionCreator';

import { updateFormData as updateMessengerFormData } from '../../../../../store/forms/messenger/actionCreator';
import { changeChatScreen } from '../../../../../store/chatbox/actionCreator';
import screenTypes from '../../../../../store/chatbox/screenTypes';
import messageTypes from '../../../../../store/forms/messenger/messageTypes';
import { formatSecondsAsCountdown } from '../../../../../../../../../helpers/formatter';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Record = () => {
    const videoStreemRef = useRef();
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
    const [recordedVideoBlob, setRecordedVidioBlob] = useState(null);
    const [recordedVidioURL, setRecordedVidioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedTimeInSecond, setRecordedTimeInSecond] = useState(0);

    // Init State
    useState(function () {
        check_if_need_permission().then(function (is_needed_permission) {
            if (is_needed_permission) {
                setCurrentStage(stages.PERMISSION);
            } else {
                setupVideoStreem();
            }
        });
    }, []);

    // On Upload Complete
    useEffect(
        function () {
            if (true === attachmentForm.status) {
                // Update Messenger Form Data
                dispatch(
                    updateMessengerFormData({
                        message_type: messageTypes.VIDEO,
                        attachment_id: attachmentForm.uploadedAttachment.id,
                    })
                );

                // Switch to Contact form
                dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
            } else if (false === attachmentForm.status) {
                setCurrentStage(stages.UPLOAD_FAILED);
            }
        },
        [attachmentForm.status]
    );

    // check_if_need_permission
    async function check_if_need_permission() {
        try {
            const microphonePermission = await navigator.permissions.query({
                name: 'microphone',
            });

            const cameraPermission = await navigator.permissions.query({
                name: 'camera',
            });

            return (
                microphonePermission.state !== 'granted' ||
                cameraPermission.state !== 'granted'
            );
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
                    sampleRate: 44100,
                },
                video: { facingMode: 'user' },
            });

            setCurrentStage(stages.RECORD);
        } catch (error) {
            console.log({ error });

            setPermissionDenied(true);
        }
    }

    // startRecording
    async function startRecording() {
        await window.wpwaxCSRecorder.startRecording();

        setRecordedTimeInSecond(0);
        setIsRecording(true);
        startTimer();
    }

    // stopRecording
    function stopRecording() {
        stopTimer();
        window.wpwaxCSRecorder.stopRecording(function (url) {
            let blob = window.wpwaxCSRecorder.getBlob();

            const tracks = window.wpwaxCSVideoStream.getTracks();
            tracks.forEach((track) => track.stop());

            setRecordedVidioBlob(blob);
            setRecordedVidioURL(url);
            setIsRecording(false);
            setCurrentStage(stages.BEFORE_SEND);
        });

        const tracks = window.wpwaxCSVideoStream.getTracks();
        tracks.forEach((track) => track.stop());
    }

    // setupVideoStreem
    async function setupVideoStreem() {
        try {
            // Setup Video Streem
            window.wpwaxCSVideoStream =
                await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100,
                    },
                    video: { facingMode: 'user' },
                });

            window.wpwaxCSRecorder = new RecordRTC(window.wpwaxCSVideoStream, {
                type: 'video',
                mimeType: 'video/webm;codecs=vp9',
                recorderType: RecordRTC.MediaStreamRecorder,
                disableLogs: true,
            });

            if (videoStreemRef.current.srcObject) {
                videoStreemRef.current.srcObject
                    .getVideoTracks()
                    .forEach((track) => {
                        track.stop();
                        videoStreemRef.current.srcObject.removeTrack(track);
                    });
            }

            videoStreemRef.current.srcObject = window.wpwaxCSVideoStream;
            videoStreemRef.current.play();
        } catch (error) {
            console.log({ error });

            setIsRecording(false);
        }
    }

    function fullscreenVideoStreem(event) {
        event.preventDefault();

        if (videoStreemRef.current.requestFullscreen) {
            videoStreemRef.current.requestFullscreen();
        } else if (videoStreemRef.current.webkitRequestFullscreen) {
            /* Safari */
            videoStreemRef.current.webkitRequestFullscreen();
        } else if (videoStreemRef.current.msRequestFullscreen) {
            /* IE11 */
            videoStreemRef.current.msRequestFullscreen();
        }
    }

    function startTimer() {
        window.wpwaxCSAudioTimer = setInterval(function () {
            setRecordedTimeInSecond(function (currentValue) {
                return currentValue + 1;
            });
        }, 1000);
    }

    function stopTimer() {
        clearInterval(window.wpwaxCSAudioTimer);
    }

    function sendVideo(e) {
        e.preventDefault();
        setCurrentStage(stages.UPLOADING);

        const formData = {
            file: recordedVideoBlob,
        };

        dispatch(updateAttachmentFormData(formData));
        dispatch(submitAttachmentForm(formData));
    }

    function prepareRecordAgain(e) {
        e.preventDefault();

        setupVideoStreem();

        setRecordedTimeInSecond(0);
        setIsRecording(false);
        setCurrentStage(stages.RECORD);
    }

    if (currentStage === stages.PERMISSION) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-permission'>
                <h4 className='wpwax-video-screen-title'>
                    To record video, your browser will need to request access to
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
            </VideoRecordWrap>
        );
    } else if (currentStage === stages.RECORD) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-staging'>
                <video ref={videoStreemRef} muted></video>
                <div className='wpwax-vm-record-staging__top'>
                    <h4 className='wpwax-vm-record-staging__title'>
                        {isRecording ? (
                            <span className='wpwax-vm-timer'>
                                <span className='wpwax-vm-sec'>
                                    {formatSecondsAsCountdown(
                                        recordedTimeInSecond
                                    )}
                                </span>
                            </span>
                        ) : (
                            ''
                        )}
                    </h4>
                    <a
                        href='#'
                        onClick={fullscreenVideoStreem}
                        className='wpwax-vm-record-staging__btn-expand'
                    >
                        <ReactSVG src={expander} />
                    </a>
                </div>
                <div
                    className={
                        isRecording
                            ? 'wpwax-vm-record-staging__action wpwax-vm-record-start'
                            : 'wpwax-vm-record-staging__action'
                    }
                >
                    <a
                        href='#'
                        className='wpwax-vm-btn-record'
                        onClick={() => {
                            if (isRecording) {
                                stopRecording();
                            } else {
                                startRecording();
                            }
                        }}
                    ></a>
                </div>
            </VideoRecordWrap>
        );
    } else if (currentStage === stages.BEFORE_SEND) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-ready'>
                <form action='#' className='wpwax-vm-form'>
                    <div className='wpwax-vm-recored-video'>
                        <div className='wpwax-vm-recorded-preview wpax-vm-preview-bg'>
                            <video controls src={recordedVidioURL}></video>
                        </div>
                    </div>
                    <div className='wpwax-vm-form-bottom'>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary wpwax-vm-mb-10'
                            onClick={(e) => sendVideo(e)}
                        >
                            Send
                            <ReactSVG src={paperPlan} />
                        </a>
                        <a
                            href='#'
                            onClick={(e) => prepareRecordAgain(e)}
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-light'
                        >
                            Cancel
                        </a>
                    </div>
                </form>
            </VideoRecordWrap>
        );
    } else if (currentStage === stages.UPLOADING) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-send-progress'>
                <div className='wpwax-vm-record-send-progress__content'>
                    <div className='wpwax-vm-record-send-progress__bar'>
                        <span>Sending</span>
                    </div>
                    <p>We’re currently uploading your response.</p>
                    <p className='wpwax-vm-danger-text'>
                        Please don’t leave this page!
                    </p>
                </div>
            </VideoRecordWrap>
        );
    } else if (currentStage === stages.UPLOAD_FAILED) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-send-progress'>
                <div>
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
            </VideoRecordWrap>
        );
    } else {
        return '';
    }
};

export default Record;
