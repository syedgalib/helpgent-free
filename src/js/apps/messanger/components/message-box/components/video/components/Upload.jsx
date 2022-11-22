import React, { useState } from 'react';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg'
import { useDispatch } from 'react-redux';
import UserAvaterList from 'Components/UserAvaterList.jsx';
import { VideoReplyWrap } from '../Style';
import plane from 'Assets/svg/icons/paper-plane.svg';

import { handleReplyModeChange, handleMessageTypeChange } from '../../../../../store/messages/actionCreator';

import useMessangerAPI from 'API/useMessangerAPI';
import useAttachmentAPI from 'API/useAttachmentAPI.js';

const Upload = ({ sessionID, backToHome, onSuccess, replayingTo }) => {

	// Use API
	const { createItem: createMessangerItem } = useMessangerAPI();
	const { createItem: createAttachmentItem } = useAttachmentAPI();

	// Local Data
    const [textMessage, setTextMessage] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [recordedVidioURL, setRecordedVidioURL] = useState('');

    const [selectedFileErrorMessage, setSelectedFileErrorMessage] =
        useState('');

    const [isSending, setIsSending] = useState(false);

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

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
        dispatch(handleMessageTypeChange(''));
        dispatch(handleReplyModeChange(false));
    };

    function prepareForUpload(event) {
        const file = event.target.files.length ? event.target.files[0] : null;

        if (!file) {
            setSelectedFile(null);
            setRecordedVidioURL(null);
            return;
        }

		const supported_video_extensions = getSupportedVideoExtensions();
		const fileExt = file.type.replace( /.+\//, '.' );

		if ( supported_video_extensions.length && ! supported_video_extensions.includes( fileExt ) ) {
			setSelectedFileErrorMessage(
                'Sorry, the selected file type is not supported.'
            );
            return;
		}

        if (file.size > getMaxUploadSize()) {
            setSelectedFileErrorMessage(
                'The file exceeded the max upload size'
            );
            setSelectedFile(null);
            setRecordedVidioURL(null);
            return;
        }

        setSelectedFileErrorMessage('');
        setSelectedFile(file);
        setRecordedVidioURL(URL.createObjectURL(file));
    }

    function getMaxUploadSize() {
        if (isNaN(wpWaxCustomerSupportApp_CoreScriptData.max_upload_size)) {
            return 0;
        }

        return parseInt(wpWaxCustomerSupportApp_CoreScriptData.max_upload_size);
    }

    function getFormattedMaxUploadSize() {
        const max_upload_size = getMaxUploadSize();

        const sizeInKB = max_upload_size / 1024;
        const sizeInMB = sizeInKB / 1024;

        const size = sizeInMB < 1 ? `${sizeInKB} KB` : `${sizeInMB} MB`;

        return size;
    }

    function getSupportedVideoExtensions() {
        if (
            !wpWaxCustomerSupportApp_CoreScriptData.supported_video_extensions
        ) {
            return [];
        }

        const supported_video_extensions =
            wpWaxCustomerSupportApp_CoreScriptData.supported_video_extensions;

        if (!Array.isArray(supported_video_extensions)) {
            return [];
        }

        return supported_video_extensions;
    }

    function getSupportedVideoExtensionsAsText() {
		const supported_video_extensions = getSupportedVideoExtensions();

		if ( ! supported_video_extensions.length ) {
			return '';
		}

        return supported_video_extensions.join(', ').trim();
    }

    async function sendVideo(e) {
        e.preventDefault;

        if (isSending) {
            return;
        }

        if (!selectedFile) {
            setSelectedFileErrorMessage('Please select a file');

            return;
        }

        setIsSending(true);

        // Upload The Attachment
        const attachmentResponse = await createAttachmentItem({ file: selectedFile});

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

    return (
        <VideoReplyWrap className='wpwax-vm-reply-ready wpwax-vm-reply-upload'>
            <a href='' className='wpwax-vm-reply-close' onClick={handleClose}>
                <span className='dashicons dashicons-no-alt'></span>
            </a>

            <div className='wpwax-vm-reply-ready__video'>
                {!recordedVidioURL || (
                    <video
                        width='100%'
                        height='100%'
                        controls
                        src={recordedVidioURL}
                    ></video>
                )}
            </div>

            <div className='wpwax-vm-reply-ready__content'>
                {replayingTo && <UserAvaterList users={[replayingTo]} />}
                <div className='wpwax-vm-reply-ready__text-form'>
                    <form action=''>
                        <div className='wpwax-vm-reply-ready__file-input'>
                            <input
                                style={{ display: 'none' }}
                                type='file'
                                accept={getSupportedVideoExtensionsAsText()}
                                name='attachment_video'
                                id='attachment_video'
                                onChange={(e) => prepareForUpload(e)}
                            />

                            <label
                                htmlFor='attachment_video'
                                className='wpawax-vm-reply-btn-upload'
                            >
                                Choose File
                            </label>
                            <br/>
                            <p>Works with {getSupportedVideoExtensionsAsText()}</p>
                            <p>Max size {getFormattedMaxUploadSize()}!</p>

                            {!selectedFileErrorMessage || (
                                <p className='wpwax-vm-text-danger wpwax-vm-mt-10'>
                                    {selectedFileErrorMessage}
                                </p>
                            )}
                        </div>
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
                                href='#'
                                className='wpwax-vm-reply-ready-btn wpwax-vm-btn-send'
                                onClick={sendVideo}
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
};

export default Upload;
