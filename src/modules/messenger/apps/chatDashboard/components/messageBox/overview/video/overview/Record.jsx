import React, { useRef, useState } from 'react';
import { ReactSVG } from 'react-svg';
import { useDispatch } from 'react-redux';
import MediaBox from 'Components/MediaBox.jsx';
import { VideoReplyWrap } from '../Style';
import userImg from 'Assets/img/chatdashboard/user.png';
import plane from 'Assets/svg/icons/paper-plane.svg';

import { handleReplyModeChange } from '../../../../../store/messages/actionCreator';
import { useEffect } from 'react';
import { formatSecondsAsCountdown } from 'Helper/formatter';

import http from 'Helper/http.js';
import attachmentAPI from 'apiService/attachment-api';

const metaList = [
    {
        type: 'email',
        text: 'sample@gmail.com',
    },
];

const Record = ({ sessionID, backToHome, onSuccess }) => {
    const stages = {
        SUBMIT: 'submit',
        RECORD: 'record',
    };

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const [currentStage, setCurrentStage] = useState(stages.RECORD);

    const [textMessage, setTextMessage] = useState('');

    const [recordedVideoBlob, setRecordedVidioBlob] = useState(null);
    const [recordedVidioURL, setRecordedVidioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedTimeInSecond, setRecordedTimeInSecond] = useState(0);

    const [isSending, setIsSending] = useState(false);

    const videoStreemRef = useRef();

    // @Init State
    useEffect(function () {
        setupVideoStreem();
    }, []);

    // handleRecordButtonAction
    const handleRecordButtonAction = (event) => {
        event.preventDefault();

        if (isRecording) {
            stopRecording();
            setCurrentStage(stages.SUBMIT);
            return;
        }

        startRecording();
    };

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

    async function sendVideo(e) {
        e.preventDefault();

        if (isSending) {
            return;
        }

        if (!recordedVideoBlob) {
            setSelectedFileErrorMessage('Please select a video');

            return;
        }

        setIsSending(true);

        // Upload The Attachment
        const attachmentResponse = await createAttachment(recordedVideoBlob);

        // Show Alert on Error
        if (!attachmentResponse.success) {
            const message = attachmentResponse.message
                ? attachmentResponse.message
                : 'Somethong went wrong, please try again.';

            alert(message);
            setIsSending(false);

            return;
        }

        const attachmentID = attachmentResponse.data.id;

        // Send The Message
        const messageResponse = await createTextMessage({
            session_id: sessionID,
            attachment_id: attachmentID,
            message: textMessage,
        });

        // Show Alert on Error
        if (!messageResponse.success) {
            const message = messageResponse.message
                ? messageResponse.message
                : 'Somethong went wrong, please try again.';
            alert(message);
            setIsSending(false);

            return;
        }

        setIsSending(false);
        onSuccess();
        dispatch(handleReplyModeChange(false));
    }

    async function createAttachment(file) {
        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await attachmentAPI.createAttachment({ file });

            status.data = response.data.data;
            status.success = true;

            return status;
        } catch (error) {
            status.success = false;

            console.error({ error });

            return status;
        }
    }

    async function createTextMessage(customArgs) {
        const defaultArgs = { message_type: 'video' };

        const args = { ...defaultArgs, ...customArgs };

        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await http.postData('/messages', args);

            status.success = true;
            status.data = response;

            return status;
        } catch (error) {
            status.success = false;

            console.error({ error });

            return status;
        }
    }

    /* Handle Back */
    const handleBack = (e) => {
        e.preventDefault();
        backToHome();
    };

    /* Handle Close */
    const handleClose = (e) => {
        e.preventDefault();
        dispatch(handleReplyModeChange(false));
    };

    if (currentStage === stages.RECORD) {
        return (
            <VideoReplyWrap
                className={
                    !isRecording
                        ? 'wpwax-vm-reply-pause'
                        : 'wpwax-vm-reply-start'
                }
            >
                <div
                    className='wpwax-vm-reply-video-bg'
                    style={{ backgroundColor: '#000000' }}
                >
                    <video
                        ref={videoStreemRef}
                        width='100%'
                        height='100%'
                        muted
                    ></video>
                </div>
                <div className='wpwax-vm-reply-top'>
                    <h4>
                        {isRecording ? (
                            <span className='wpwax-vm-timer'>
                                {' '}
                                {formatSecondsAsCountdown(recordedTimeInSecond)}
                            </span>
                        ) : (
                            ''
                        )}
                    </h4>
                    {isRecording || (
                        <a
                            href=''
                            className='wpwax-vm-reply-close'
                            onClick={handleClose}
                        >
                            <span className='dashicons dashicons-no-alt'></span>
                        </a>
                    )}
                </div>
                <div className='wpwax-vm-reply-bottom'>
                    <a
                        href=''
                        className='wpwax-vm-btn-record'
                        onClick={handleRecordButtonAction}
                    ></a>
                </div>
            </VideoReplyWrap>
        );
    } else {
        return (
            <VideoReplyWrap className='wpwax-vm-reply-ready'>
                <a
                    href=''
                    className='wpwax-vm-reply-close'
                    onClick={handleClose}
                >
                    <span className='dashicons dashicons-no-alt'></span>
                </a>

                <div className='wpwax-vm-reply-ready__video'>
                    <div className='wpwax-vm-reply-video-bg'>
                        <video
                            controls
                            src={recordedVidioURL}
                            width='100%'
                            height='100%'
                        ></video>
                    </div>
                </div>

                <div className='wpwax-vm-reply-ready__content'>
                    <MediaBox
                        img={userImg}
                        title={'Replying to Adnan…'}
                        metaList={metaList}
                    />
                    <div className='wpwax-vm-reply-ready__text-form'>
                        <form action=''>
                            <div className='wpwax-vm-reply-ready__text-form-input'>
                                <textarea
                                    value={textMessage}
                                    name='wpwax-vm-reply-ready-text'
                                    id='wpwax-vm-reply-ready-text'
                                    placeholder='Type your text...'
                                    onChange={(event) => {
                                        setTextMessage(event.target.value);
                                    }}
                                ></textarea>
                            </div>
                            <div className='wpwax-vm-reply-ready__text-form--action'>
                                <a
                                    href='#'
                                    className='wpwax-vm-reply-ready-btn wpwax-vm-btn-back'
                                    onClick={handleBack}
                                >
                                    <span className='dashicons dashicons-arrow-left-alt'></span>
                                    <span className='wpwax-vm-reply-ready-btn__text'>
                                        Back
                                    </span>
                                </a>
                                <a
                                    onClick={sendVideo}
                                    href='#'
                                    className='wpwax-vm-reply-ready-btn wpwax-vm-btn-send'
                                >
                                    <span className='wpwax-vm-reply-ready-btn__text'>
                                        {!isSending ? 'Send' : 'Sending...'}
                                    </span>
                                    <ReactSVG src={plane} />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </VideoReplyWrap>
        );
    }
};

export default Record;
