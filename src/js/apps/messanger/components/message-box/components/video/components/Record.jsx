import React, { useRef, useState } from 'react';
import ReactSVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import UserAvaterList from 'Components/UserAvaterList.jsx';
import { VideoReplyWrap } from '../Style';
import plane from 'Assets/svg/icons/paper-plane.svg';
import play from 'Assets/svg/icons/play.svg';
import pause from 'Assets/svg/icons/pause-solid.svg';
import crossSmall from 'Assets/svg/icons/cross-small.svg';

import { handleReplyModeChange, handleMessageTypeChange } from '../../../../../store/messages/actionCreator';
import { useEffect } from 'react';

import useMessangerAPI from 'API/useMessangerAPI';
import { useCoreData } from 'Hooks/useCoreData.jsx';
import useAttachmentAPI from 'API/useAttachmentAPI.js';

import useCountdown from 'Hooks/useCountdown';
import useVideoRecorder from 'Hooks/media-recorder/useVideoRecorder';
import { MIN_IN_SECONDS } from 'Helper/const';

const Record = ({ videoRecorderStatus, setVideoRecorderStatus, sessionID, backToHome, onSuccess, replayingTo }) => {
    const stages = {
        SUBMIT: 'submit',
        RECORD: 'record',
    };

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

	// useCountdown
	const {
		isActiveCountdown,
		startCountdown,
		CountdownPage,
		getReverseCount,
	} = useCountdown();

	// useVideoRecorder
	const {
		isVideoRecording,
		isRecordingPaused,
		recordedBlob: recordedVideoBlob,
		recordedURL: recordedVideoURL,
		videoStreemRef,
		setupStream: setupVideoStreem,
		startRecording,
        resumeRecording,
        pauseRecording,
		stopRecording,
		getCountDown,
        recordedTimeInSecond
	} = useVideoRecorder({
		maxRecordLength: getMaxRecordLength(),
		resolution: getVideoResolution(),
		afterStopRecording: function() {
			setCurrentStage(stages.BEFORE_SEND);
		}
	});

	// Use API
	const { createItem: createMessangerItem }  = useMessangerAPI();
	const { createItem: createAttachmentItem } = useAttachmentAPI();

    const [currentStage, setCurrentStage] = useState(stages.RECORD);
    const [textMessage, setTextMessage] = useState('');

    const [isSending, setIsSending] = useState(false);

    // @Init State
    useEffect(function () {
        setupVideoStreem();
    }, []);

    // handleRecordButtonAction
    const handleRecordButtonAction = (event) => {
        event.preventDefault();

        if (isVideoRecording) {
            stopRecording();
            setCurrentStage(stages.SUBMIT);
            return;
        }

        startRecording();
    };

	function getMaxRecordLength() {
		if ( wpWaxCustomerSupportApp_MessengerScriptData.videoRecordTimeLimit ) {
			return parseFloat( wpWaxCustomerSupportApp_MessengerScriptData.videoRecordTimeLimit );
		}

		return 2 * MIN_IN_SECONDS;
	}

	function getVideoResolution() {
		let resolution = 720;

		const videoResolution = useCoreData( 'settings.videoResolution' );

		if ( ! isNaN( videoResolution ) ) {
			resolution = `${videoResolution}`;
		}

		return resolution;
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
        const attachmentResponse = await createAttachmentItem( { file: recordedVideoBlob } );

        // Show Alert on Error
        if (!attachmentResponse.success) {
            const message = attachmentResponse.message
                ? attachmentResponse.message
                : 'Something went wrong, please try again.';

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
                : 'Something went wrong, please try again.';
            alert(message);
            setIsSending(false);

            return;
        }

        setIsSending(false);
        onSuccess();

		close();
        dispatch(handleReplyModeChange(false));
        setVideoRecorderStatus(null);
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

    /* Handle Start Recording */
    async function handleStartRecording( e ) {
		e.preventDefault();
        setVideoRecorderStatus('recording')
		await startCountdown();
		startRecording();
	}

    /* Handle Resume Recording */
    async function handleResumeRecording( e ) {
		e.preventDefault();
        resumeRecording();
	}

    /* Handle Pause Recording */
    async function handlePauseRecording( e ) {
		e.preventDefault();
		if ( isVideoRecording ) {
            setVideoRecorderStatus('paused');
			pauseRecording();
		}
	}

    /* Handle Send Recording */
    async function handleSendRecording( e ) {
		e.preventDefault();
        stopRecording();
	}

    /* Handle Close */
    const handleClose = (e) => {
        e.preventDefault();
        if(!isVideoRecording || !isRecordingPaused){
            setVideoRecorderStatus(null);
            close();
        }
    };

    /* Close */
    const close = () => {
		stopRecording();
        dispatch(handleMessageTypeChange(''));
        dispatch(handleReplyModeChange(false));
    };

    const getRightBtnContent = () => {
        if (isRecordingPaused || isVideoRecording) {
            return (
                <a
                    href='#'
                    className={isRecordingPaused ? 'wpwax-vm-btn-record-right wpwax-vm-btn-play' : 'wpwax-vm-btn-record-right wpwax-vm-btn-pause'}
                    onClick={ isRecordingPaused ?  (e) => handleResumeRecording(e) : (e) => handlePauseRecording(e)}

                > {isRecordingPaused ? null : <ReactSVG src={pause} />} </a>
            );
        } else if (isVideoRecording && recordedTimeInSecond === 0) {
            return null;
        }
    };

    if (currentStage === stages.RECORD) {
        return (
            <VideoReplyWrap
                className={
                    isVideoRecording || isRecordingPaused
                        ? 'wpwax-vm-reply-start'
                        : null
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
                            <span className='wpwax-vm-timer'>
                                {getCountDown()}
                            </span>
						</h4>
						{isVideoRecording || (
							<a
								href=''
								className='wpwax-vm-reply-close'
								onClick={handleClose}
							>
								<ReactSVG src={crossSmall} />
							</a>
						)}
					</div>
				) }

				{ ! isActiveCountdown && (
					<div className='wpwax-vm-reply-bottom'>
                        {
                            isVideoRecording || isRecordingPaused ? 
                            <a
                                href='#'
                                className='wpwax-vm-btn-record'
                                onClick={ handleSendRecording }
                            ></a>
                            : 
                            <a
                                href='#'
                                className='wpwax-vm-btn-record'
                                onClick={ handleStartRecording }
                            ></a>
                        }
                        
                        {
                            getRightBtnContent()
                        }
						
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
                            src={recordedVideoURL}
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
