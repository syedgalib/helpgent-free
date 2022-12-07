import React, { useRef, useState } from 'react';
import ReactSVG from 'react-inlinesvg';
import { VideoRecordWrap } from '../Style';

/* Images */
import permissionImg from 'Assets/img/chatbox/permission.png';
import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import arrowLeft from 'Assets/svg/icons/arrow-small-left.svg';
import arrowRight from 'Assets/svg/icons/arrow-small-right.svg';
import play from 'Assets/svg/icons/play.svg';
import pause from 'Assets/svg/icons/pause-solid.svg';
import {
    updateFormData as updateAttachmentFormData,
    submitForm as submitAttachmentForm,
} from '../../../../../store/forms/attachment/actionCreator';

import { updateFormData as updateMessengerFormData } from '../../../../../store/forms/messenger/actionCreator';
import { changeChatScreen } from '../../../../../store/chatbox/actionCreator';
import screenTypes from '../../../../../store/chatbox/screenTypes';
import messageTypes from '../../../../../store/forms/messenger/messageTypes';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useChatboxController from '../../../hooks/useChatboxController';

import useCountdown from 'Hooks/useCountdown';
import useVideoRecorder from 'Hooks/media-recorder/useVideoRecorder';
import { MIN_IN_SECONDS } from 'Helper/const';

const Record = props => {
	const stages = {
        PERMISSION: 'permission',
        RECORD: 'record',
        BEFORE_SEND: 'before_send',
        UPLOADING: 'uploading',
        UPLOAD_FAILED: 'upload_failed',
    };

    const { homeCurrentStage , setHomeCurrentStage} = props;

    const [ currentStage, setCurrentStage ] = useState(stages.RECORD);

	// Store States
    const { settings, attachmentForm } = useSelector((state) => {
        return {
            settings: state.settings.options,
            attachmentForm: state.attachmentForm,
        };
    });

	// useChatboxController
	const {
		needToGoContactPage
	} = useChatboxController();

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
		permissionDenied,
		recordedBlob,
		recordedURL: recordedVideoURL,
		videoStreemRef,
		hasPermission,
		requestPermission,
		setupStream,
		startRecording,
        resumeRecording,
        pauseRecording,
		stopRecording,
		getCountDown,
        recordedTimeInSecond,
		reset: resetVideoRecorder,
	} = useVideoRecorder({
		maxRecordLength: getMaxRecordLength(),
		resolution: getVideoResolution(),
		afterStopRecording: function() {
			setCurrentStage(stages.BEFORE_SEND);
		}
	});

	const { addAction } = wpwaxHooks;
    const dispatch = useDispatch();


    // Init State
    useState(function () {
		initialSetup();
    }, []);

	async function initialSetup() {
		const _hasPermission = await hasPermission();

		if ( _hasPermission ) {
			addAction( 'beforeCloseChatbox', stopRecording );
			setupStream();
			return;
		}

		setCurrentStage( stages.PERMISSION );
	}

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

                // Navigate to Contact form or Sending Page
				if ( needToGoContactPage() ) {
					dispatch( changeChatScreen( screenTypes.CONTACT_FORM) );
					return;
				}

				dispatch( changeChatScreen( screenTypes.SENDING ) );

            } else if (false === attachmentForm.status) {
                setCurrentStage(stages.UPLOAD_FAILED);
            }
        },
        [attachmentForm.status]
    );

	async function handlePauseRecording( e ) {
		e.preventDefault();

		if ( isVideoRecording ) {
			pauseRecording();
		}
	}

    /* Start Recording */
	async function handleStartRecording( e ) {
		e.preventDefault();
		await startCountdown();
		startRecording();
	}

    /* Handle Resume Recording */
	async function handleResumeRecording( e ) {
		e.preventDefault();
        resumeRecording();
	}

    /* Handle Send Recording */
	async function handleSendRecording( e ) {
		e.preventDefault();
        stopRecording();
	}

	function getMaxRecordLength() {
		if ( settings && typeof settings.maxVideoLength !== 'undefined' && ! isNaN( settings.maxVideoLength ) ) {
			return parseFloat( settings.maxVideoLength ) * MIN_IN_SECONDS;
		}

		return 2 * MIN_IN_SECONDS;
	}

	function getVideoResolution() {
		let resolution = 720;

		if ( settings && typeof settings.videoResolution !== 'undefined' && ! isNaN( settings.videoResolution ) ) {
			resolution = `${settings.videoResolution}`;
		}

		return resolution;
	}

    function sendVideo(e) {
        e.preventDefault();
        setCurrentStage(stages.UPLOADING);

        const formData = { file: recordedBlob };

        dispatch(updateAttachmentFormData(formData));
        dispatch(submitAttachmentForm(formData));
    }

    function prepareRecordAgain(e) {
        e.preventDefault();

		resetVideoRecorder();
		setupStream();

        setCurrentStage( stages.RECORD );
    }

	async function handleRequestPermission( e ) {
		e.preventDefault();

		const granted = await requestPermission();

		if ( ! granted ) {
			return;
		}

		addAction( 'beforeCloseChatbox', stopRecording );
		setupStream();
		setCurrentStage( stages.RECORD );
	}

    function tryUploadAgain(e) {
        e.preventDefault();
        setCurrentStage(stages.BEFORE_SEND);
    }

    function handleBackScreen(event) {
        event.preventDefault();
        dispatch( changeChatScreen( screenTypes.HOME ) );
	}
    function handleCancelRecording(event) {
        event.preventDefault();
        stopRecording();
        setHomeCurrentStage('home')
	}

    const getRightBtnContent = () => {
        if (isVideoRecording || isRecordingPaused) {
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

    if (currentStage === stages.PERMISSION) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-permission'>
                <a href="#" className="wpwax-vm-btn-back" onClick={handleBackScreen}><ReactSVG src={arrowRight} /></a>
                <h4 className='wpwax-video-screen-title'>
                    To record video, your browser will need to request access to
                    your camera & microphone.
                </h4>
                <img src={permissionImg} alt='wpwax video support' />
                <a
                    href='#'
                    className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                    onClick={ handleRequestPermission }
                >
                    Request Permission
                </a>

                {permissionDenied !== null && permissionDenied && (
                    <div className='wpwax-vm-mt-10 wpwax-vm-alert wpwax-vm-alert-danger'>
                        Please grant the requested permission
                    </div>
                )}
            </VideoRecordWrap>
        );
    } else if (currentStage === stages.RECORD) {
        return (
            <VideoRecordWrap className="wpwax-vm-record-staging">
                <a href="#" className="wpwax-vm-btn-back" onClick={handleCancelRecording}><ReactSVG src={arrowRight} /></a>
                <video ref={videoStreemRef} muted></video>

				{ isActiveCountdown && ( <div className="wpwax-vm-record-staging__countdown"><CountdownPage count={ getReverseCount() } /></div> ) }

				<div className='wpwax-vm-record-staging__top'>
                    <h4 className='wpwax-vm-record-staging__title'>
                        <span className='wpwax-vm-timer'>
                            <span className='wpwax-vm-sec'>
                                {getCountDown()}
                            </span>
                        </span>
                    </h4>
                </div>

				<div
                    className={
                        isVideoRecording || isRecordingPaused
                            ? 'wpwax-vm-record-staging__action wpwax-vm-record-start'
                            : 'wpwax-vm-record-staging__action'
                    }
                >
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
            </VideoRecordWrap>
        );
    } else if (currentStage === stages.BEFORE_SEND) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-ready'>
                <form action='#' className='wpwax-vm-form'>
                    <div className='wpwax-vm-recored-video'>
                        <div className='wpwax-vm-recorded-preview wpax-vm-preview-bg'>
                            <video controls src={recordedVideoURL}></video>
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
                        <span>Uploading</span>
                    </div>
                    <h4>We’re currently uploading your file.</h4>
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
                        Couldn't upload the file, please try again.
                    </p>
                    <a
                        href='#'
                        onClick={tryUploadAgain}
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
