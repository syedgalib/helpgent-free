import React from 'react';
import author from 'Assets/img/chatdashboard/user.png';
import { useRef } from 'react';
import Image from 'Components/Image.jsx';
import TextMessage from './TextMessage.jsx';
import AudioMessage from './AudioMessage.jsx';
import VideoMessage from './VideoMessage.jsx';

import { MessageBox } from './Style';

function Message({ data, currentUser }) {
    const container = useRef();
	const isMine = currentUser && currentUser.email === data.user_email;

    /* Load Message Content */
    const setMessageContent = () => {
        if (data.message_type === 'text') {
            return <TextMessage data={data} />;
        } else if (data.message_type === 'video') {
            return data.attachment_id ? <VideoMessage data={data} /> : <p>This video has been removed.</p>;
        } else if (data.message_type === 'audio') {
			return data.attachment_id ? <AudioMessage data={data} /> : <p>This audio has been removed.</p>;
		}
    };

    const singleMessageContainerClass = ( ( ( data.message_type == 'audio' ) || ( data.message_type == 'video' ) ) && ! data.attachment_id ) ? 'wpwax-vm-message-content wpwax-vm-message-attachment-not-found' : 'wpwax-vm-message-content';

    return (
        <MessageBox
            ref={container}
            className={
                isMine
                    ? `wpwax-vm-message-single wpwax-vm-message-single-${data.message_type}`
                    : `wpwax-vm-message-single wpwax-vm-message-single-${data.message_type} wpwax-vm-message-single-replied`
            }
        >
            <div className={singleMessageContainerClass}>
                <div className='wpwax-vm-message-content__top'>
                    <span className='wpwax-vm-message--authorname'>
                        {data.user.name},
                    </span>
                    <span className='wpwax-vm-message-time'>
                        {data.created_at_formatted}
                    </span>
                </div>
                <div className='wpwax-vm-message-content__inner'>
                    {setMessageContent()}
                </div>
            </div>

            <div className='wpwax-vm-message-author'>
                <Image
                    src={data.user.avater ? data.user.avater : author}
                    alt='Author Avater'
                />
            </div>
        </MessageBox>
    );
}

export default Message;
