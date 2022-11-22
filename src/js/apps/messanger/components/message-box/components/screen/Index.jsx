import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import ReactSVG from 'react-inlinesvg';
import UserAvaterList from 'Components/UserAvaterList.jsx';
import { handleReplyModeChange } from '../../../../store/messages/actionCreator';
import { VideoReplyWrap } from './Style';
import plane from 'Assets/svg/icons/paper-plane.svg';

import http from 'Helper/http.js';
import attachmentAPI from 'apiService/attachment-api';
import useAttachmentAPI from 'API/useAttachmentAPI.js';

const Screen = ({ recordedBold, recordUrl, sessionID, onSuccess, replayingTo })=>{

    const [textMessage, setTextMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

	const { createItem: createAttachmentItem } = useAttachmentAPI();

    /* Handle Close */
    const handleClose = (e) => {
        e.preventDefault();
        close();
    };

    /* Handle Close */
    const close = () => {
        dispatch(handleReplyModeChange(false));
    };

    const sendVideo = async (e) =>{
        e.preventDefault();

        if (isSending) {
            return;
        }

        if (!recordedBold) {
            setSelectedFileErrorMessage('Please select a video');

            return;
        }

        setIsSending(true);

        // Upload The Attachment
        const attachmentResponse = await createAttachmentItem({ file: recordedBold });

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
            conversation_id: sessionID,
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

    return(
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
                        src={recordUrl}
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
    )
}

export default Screen;