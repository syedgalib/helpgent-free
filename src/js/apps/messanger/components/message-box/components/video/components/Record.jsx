import React, { useRef, useState } from 'react';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg'
import { useDispatch } from 'react-redux';
import UserAvaterList from 'Components/UserAvaterList.jsx';
import { VideoReplyWrap } from '../Style';
import plane from 'Assets/svg/icons/paper-plane.svg';

import { handleReplyModeChange, handleMessageTypeChange } from '../../../../../store/messages/actionCreator';
import { useEffect } from 'react';
import { formatSecondsAsCountdown } from 'Helper/formatter';

import attachmentAPI from 'apiService/attachment-api';
import useMessangerAPI from 'API/useMessangerAPI';
import useCountdown from 'Hooks/useCountdown';

const Record = ({ sessionID, backToHome, onSuccess, replayingTo }) => {
    const stages = {
        SUBMIT: 'submit',
        RECORD: 'record',
    };

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

	const {
		isActiveCountdown,
		startCountdown,
		CountdownPage,
		getReverseCount,
	} = useCountdown();

	// Use API
	const { createItem: createMessangerItem } = useMessangerAPI();

    const [currentStage, setCurrentStage] = useState(stages.RECORD);
    const [textMessage, setTextMessage] = useState('');
    const [recordedVideoBlob, setRecordedVidioBlob] = useState(null);
    const [recordedVidioURL, setRecordedVidioURL] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recordedTimeInSecond, setRecordedTimeInSecond] = useState(0);

	const [ maxRecordLength, setMaxRecordLength ] = useState( null );

    const [isSending, setIsSending] = useState(false);

    const videoStreemRef = useRef();

    // @Init State
    useEffect(function () {

		if ( wpWaxCustomerSupportApp_MessengerScriptData.videoRecordTimeLimit ) {
			setMaxRecordLength( parseFloat( wpWaxCustomerSupportApp_MessengerScriptData.videoRecordTimeLimit ) );
		}

        setupVideoStreem();
    }, []);

	useEffect( () => {

		if ( ! maxRecordLength ) {
			return;
		}

		if ( recordedTimeInSecond >= maxRecordLength ) {
			stopRecording();
		}

	}, [ recordedTimeInSecond ] );

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

		// Start Countdown
		await startCountdown();

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

	function reversedRecordedTimeInSecond() {
		return ( maxRecordLength - recordedTimeInSecond );
	}

	function getCountDown() {

		if ( ! maxRecordLength || recordedTimeInSecond < 1 ) {
			return formatSecondsAsCountdown( recordedTimeInSecond );
		}

		return formatSecondsAsCountdown( reversedRecordedTimeInSecond() );
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

		close();
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
        const defaultArgs = { conversation_id: sessionID, message_type: 'video' };
        const args = { ...defaultArgs, ...customArgs };

        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await createMessangerItem( args );

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
		close();
    };

    /* Close */
    const close = () => {
		stopRecording();
        dispatch(handleMessageTypeChange(''));
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

				{ isActiveCountdown && ( <div className="wpwax-vm-reply-countdown"><CountdownPage count={ getReverseCount() } /></div> ) }

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

                { ! isActiveCountdown && (
					<div className='wpwax-vm-reply-top'>
						<h4>
							{isRecording ? (
								<span className='wpwax-vm-timer'>
									{' '}
									{getCountDown()}
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
				) }

				{ ! isActiveCountdown && (
					<div className='wpwax-vm-reply-bottom'>
						<a
							href=''
							className='wpwax-vm-btn-record'
							onClick={handleRecordButtonAction}
						></a>
					</div>
				)}

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
                    {replayingTo && (
                        <div className=''>
                            <UserAvaterList users={[replayingTo]} />
                        </div>
                    )}

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
                                    onClick={handleClose}
                                >
                                    <span className='dashicons dashicons-arrow-left-alt'></span>
                                    <span className='wpwax-vm-reply-ready-btn__text'>
                                        Cancel
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
