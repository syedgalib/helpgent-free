import React, { useState } from 'react';
import author from 'Assets/img/chatdashboard/user.png';
import { useRef } from 'react';
import { useEffect } from 'react';
import http from 'Helper/http.js';
import Image from 'Components/Image.jsx';
import TextMessage from './TextMessage.jsx';
import AudioMessage from './AudioMessage.jsx';
import VideoMessage from './VideoMessage.jsx';

import { MessageBox } from './Style';

function Message({ data, currentUser, containerScrollMeta, onMarkedAsRead }) {
    const container = useRef();
    const [updatingIsSeen, setUpdatingIsSeen] = useState(false);

	const isMine = currentUser && parseInt(currentUser.id) === parseInt(data.user.id);

    // @Init State
    useEffect(
        function () {
            if (updatingIsSeen) {
                return;
            }

            if (data.is_seen) {
                return;
            }

            const self = container.current;

            let parentScrollMeta = containerScrollMeta;

            if (!parentScrollMeta) {
                const offsetParent = self.offsetParent;

                parentScrollMeta = {
                    viewPortTop: offsetParent.scrollTop,
                    viewPortBottom:
                        offsetParent.scrollTop + offsetParent.offsetHeight,
                };
            }

            if (!Object.keys(parentScrollMeta).length) {
                return;
            }

            if (!self) {
                return;
            }

            const viewPortTop = parentScrollMeta.viewPortTop;
            const viewPortBottom = parentScrollMeta.viewPortBottom;

            const selfTop = self.offsetTop;
            const selfBottom = selfTop + self.offsetHeight;
            const isVisible =
                selfTop >= viewPortTop && selfBottom <= viewPortBottom;

            if (isVisible) {
                setUpdatingIsSeen(true);

                createSeenBy(data.id)
                    .then(() => {
                        setUpdatingIsSeen(false);
                        onMarkedAsRead();
                    })
                    .catch((error) => {
                        console.error({ error });
                        setUpdatingIsSeen(false);
                    });
            }
        },
        [containerScrollMeta]
    );

    const createSeenBy = async (id, args) => {
        let status = {
            success: false,
            data: null,
        };

        try {
            const response = await http.postData(
                `/messages/${id}/seen-by`,
                args
            );

            status.success = true;
            status.data = response;

            return status;
        } catch (error) {
            status.success = false;

            console.error({ error });

            return status;
        }
    };

    /* Load Message Content */
    const setMessageContent = () => {
        if (data.message_type === 'text') {
            return <TextMessage data={data} />;
        } else if (data.message_type === 'video') {
            return <VideoMessage data={data} />;
            // return (
            //     <React.Fragment>
            //         <div className='wpwax-vm-message-content__inner--video'>
            //             <video
            //                 ref={videoRef}
            //                 src={data.attachment_url}
            //                 onPlay={() => {
            //                     setIsPlayingVideo(true);
            //                 }}
            //                 onPause={() => {
            //                     setIsPlayingVideo(false);
            //                 }}
            //                 style={{
            //                     height: '247.5px',
            //                     backgroundColor: '#000',
            //                     borderRadius: '16px',
            //                 }}
            //             ></video>
            //             <a
            //                 href='#'
            //                 className={isPlayingVideo ? 'wpwax-vm-btn-pause' : 'wpwax-vm-btn-play'}
            //                 onClick={(e) => {
            //                     togglePlayPauseVidio(e);
            //                 }}
            //             >
            //             {
            //                 isPlayingVideo ? <ReactSVG src={pauseIcon} /> : <ReactSVG src={playIcon} />
            //             }
            //             </a>
            //             <a
            //                 href='#'
            //                 className='wpwax-vm-btn-expander'
            //                 onClick={handleExpandVideo}
            //             >
            //                 <ReactSVG src={expander} />
            //             </a>
            //         </div>
            //         {data.message && (
            //             <div className='wpwax-vm-message-content__inner--text wpwax-vm-mt-20'>
            //                 <p><Linkify>{data.message}</Linkify></p>
            //             </div>
            //         )}
            //     </React.Fragment>
            // );
        } else if (data.message_type === 'audio') {
			return <AudioMessage data={data} />;
		}
    };

    return (
        <MessageBox
            ref={container}
            className={
                isMine
                    ? `wpwax-vm-message-single wpwax-vm-message-single-${data.message_type}`
                    : `wpwax-vm-message-single wpwax-vm-message-single-${data.message_type} wpwax-vm-message-single-replied`
            }
        >
            <div className='wpwax-vm-message-content'>
                <div className='wpwax-vm-message-content__top'>
                    <span className='wpwax-vm-message--authorname'>
                        {data.user.name},
                    </span>
                    <span className='wpwax-vm-message-time'>
                        {data.created_on_formatted}
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
