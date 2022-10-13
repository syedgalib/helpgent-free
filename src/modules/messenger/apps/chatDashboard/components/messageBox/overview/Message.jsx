import React, { useState } from 'react';
import Linkify from 'Externals/Linkify.jsx';
import { MessageBox } from './Style';
import author from 'Assets/img/chatdashboard/user.png';
import audioRangeActive from 'Assets/svg/icons/audio-range-active.svg';
import audioRangeInactive from 'Assets/svg/icons/audio-range-inactive.svg';
import expander from 'Assets/svg/icons/expand.svg';
import { useRef } from 'react';
import { formatSecondsAsCountdown } from 'Helper/formatter';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { useEffect } from 'react';
import http from 'Helper/http.js';
import Image from 'Components/Image.jsx';

function Message({ data, currentUser, containerScrollMeta, onMarkedAsRead }) {
    const isMine =
        currentUser && parseInt(currentUser.id) === parseInt(data.user.id);
    const audioRef = useRef();
    const videoRef = useRef();
    const container = useRef();

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState(0);

    const [isPlayingVideo, setIsPlayingVideo] = useState(false);
    const [updatingIsSeen, setUpdatingIsSeen] = useState(false);

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

    function togglePlayPauseAudio(e) {
        e.preventDefault();

        if (!audioRef.current) {
            return;
        }

        if (audioRef.current.paused) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }

    function togglePlayPauseVidio(e) {
        e.preventDefault();

        if (!videoRef.current) {
            return;
        }

        if (videoRef.current.paused) {
            setIsPlayingVideo(true);
            videoRef.current.play();
        } else {
            videoRef.current.pause();
            setIsPlayingVideo(false);
        }
    }

    function getPlayedTimeInPercent() {
        const r = audioCurrentTime / audioDuration;
        return isNaN(r) ? 0 : r * 100;
    }

    function getAudioTimer() {
        const remainingTime = audioDuration - audioCurrentTime;

        return formatSecondsAsCountdown(remainingTime);
    }

    function handleExpandVideo(event) {
        event.preventDefault();
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        } else if (videoRef.current.webkitRequestFullscreen) {
            /* Safari */
            videoRef.current.webkitRequestFullscreen();
        } else if (videoRef.current.msRequestFullscreen) {
            /* IE11 */
            videoRef.current.msRequestFullscreen();
        }
    }
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
            return (
                <div className='wpwax-vm-message-content__inner--text'>
                    <p><Linkify>{data.message}</Linkify></p>
                </div>
            );
        } else if (data.message_type === 'video') {
            return (
                <React.Fragment>
                    <div className='wpwax-vm-message-content__inner--video'>
                        <video
                            ref={videoRef}
                            src={data.attachment_url}
                            onPlay={() => {
                                setIsPlayingVideo(true);
                            }}
                            onPause={() => {
                                setIsPlayingVideo(false);
                            }}
                            style={{
                                height: '247.5px',
                                backgroundColor: '#000',
                                borderRadius: '16px',
                            }}
                        ></video>
                        <a
                            href='#'
                            className='wpwax-vm-btn-play'
                            onClick={(e) => {
                                togglePlayPauseVidio(e);
                            }}
                        >
                            <span
                                className={
                                    isPlayingVideo
                                        ? 'dashicons dashicons-controls-pause'
                                        : 'dashicons dashicons-controls-play'
                                }
                            ></span>
                        </a>
                        <a
                            href='#'
                            className='wpwax-vm-btn-expander'
                            onClick={handleExpandVideo}
                        >
                            <ReactSVG src={expander} />
                        </a>
                    </div>
                    {data.message && (
                        <div className='wpwax-vm-message-content__inner--text wpwax-vm-mt-20'>
                            <p><Linkify>{data.message}</Linkify></p>
                        </div>
                    )}
                </React.Fragment>
            );
        } else if (data.message_type === 'audio') {
            return (
                <>
                    <div className='wpwax-vm-message-content__inner--audio'>
                        <a
                            href='#'
                            onClick={(e) => {
                                togglePlayPauseAudio(e);
                            }}
                            className='wpwax-vm-btn-play'
                        >
                            <span
                                className={
                                    isPlayingAudio
                                        ? 'dashicons dashicons-controls-pause'
                                        : 'dashicons dashicons-controls-play'
                                }
                            ></span>
                        </a>
                        <span className='wpwax-vm-audio-range'>
                            <div
                                style={{
                                    position: 'relative',
                                    margin: '5px',
                                    width: '190px',
                                    height: '21px',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        display: 'inline-block',
                                        backgroundPositionX: '0px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundImage:
                                            'url( ' + audioRangeInactive + ' )',
                                        zIndex: 0,
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: getPlayedTimeInPercent() + '%',
                                        position: 'absolute',
                                        left: 0,
                                        right: 0,
                                        top: 0,
                                        bottom: 0,
                                        display: 'inline-block',
                                        backgroundPositionX: '0px',
                                        backgroundRepeat: 'no-repeat',
                                        backgroundImage:
                                            'url( ' + audioRangeActive + ' )',
                                        zIndex: 1,
                                        transition: 'all 300ms ease-in-out 0s',
                                    }}
                                ></div>
                            </div>

                            <span className='wpwax-vm-timer'>
                                {getAudioTimer()}
                            </span>
                        </span>
                        <audio
                            ref={audioRef}
                            onPlay={() => {
                                setIsPlayingAudio(true);
                            }}
                            onPause={() => {
                                setIsPlayingAudio(false);
                            }}
                            onTimeUpdate={(event) => {
                                setAudioCurrentTime(event.target.currentTime);
                            }}
                            onLoadedData={(event) => {
                                setAudioDuration(event.target.duration);
                            }}
                            src={data.attachment_url}
                        ></audio>
                    </div>

                    {data.message && (
                        <div className='wpwax-vm-message-content__inner--text wpwax-vm-mt-20'>
                            <p><Linkify>{data.message}</Linkify></p>
                        </div>
                    )}
                </>
            );
        }
    };

    return (
        <MessageBox
            ref={container}
			style={{
				backgroundColor: ( data.is_seen ) ? 'green' : 'transparent'
			}}
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
