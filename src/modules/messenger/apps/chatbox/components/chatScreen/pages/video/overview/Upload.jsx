import React, { useState, useEffect, useRef } from 'react';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { VideoRecordWrap } from '../Style';

import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import { useDispatch, useSelector } from 'react-redux';
import messageTypes from '../../../../../store/forms/messenger/messageTypes';
import screenTypes from '../../../../../store/chatbox/screenTypes';
import { changeChatScreen } from '../../../../../store/chatbox/actionCreator';

import { updateFormData as updateMessengerFormData } from '../../../../../store/forms/messenger/actionCreator';
import { submitForm as submitAttachmentForm } from '../../../../../store/forms/attachment/actionCreator';

const Upload = ({ file, back }) => {
    const stages = {
        BEFORE_SEND: 'before_send',
        UPLOADING: 'uploading',
        UPLOAD_FAILED: 'upload_failed',
    };

    const dispatch = useDispatch();

	// Store States
	const { attachmentForm, messengerForm } = useSelector((state) => {
		return {
			attachmentForm: state.attachmentForm,
			messengerForm: state.messengerForm,
		};
	});

    const [currentStage, setCurrentStage] = useState(stages.BEFORE_SEND);
    const [recordedVidioURL, setRecordedVidioURL] = useState('');

    // Init State
    useEffect(function () {
        if (!file) {
            return;
        }

        setRecordedVidioURL(URL.createObjectURL(file));
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

				// Navigate to Contact form or Sending Page
				if ( messengerForm.formData.user_id ) {
					dispatch(changeChatScreen(screenTypes.SENDING));
				} else {
					dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
				}

            } else if (false === attachmentForm.status) {
                setCurrentStage(stages.UPLOAD_FAILED);
            }
        },
        [attachmentForm.status]
    );

    function goBack(e) {
        e.preventDefault;
        back(e);
    }

    function sendVideo(e) {
        e.preventDefault;

        setCurrentStage(stages.UPLOADING);

        dispatch(submitAttachmentForm({ file }));
    }

    if (currentStage === stages.BEFORE_SEND) {
        return (
            <VideoRecordWrap className='wpwax-vm-record-ready'>
                <form action='#' className='wpwax-vm-form'>
                    <div className='wpwax-vm-recored-video'>
                        <div className='wpwax-vm-recorded-preview wpax-vm-preview-bg'>
                            <video controls src={recordedVidioURL}></video>
                        </div>
                    </div>
                    <div className='wpwax-vm-form-bottom'>
                        <p>Ready to send?</p>
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
                            onClick={(e) => goBack(e)}
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
                    <h4>We’re currently uploading your response.</h4>
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
                        onClick={(e) => goBack(e)}
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

export default Upload;
