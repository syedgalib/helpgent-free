import { useState } from 'react';
import { MessageBox } from './Style';
import author from 'Assets/img/chatdashboard/user.png';
import audioRangeActive from 'Assets/svg/icons/audio-range-active.svg';
import audioRangeInactive from 'Assets/svg/icons/audio-range-inactive.svg';
import { useRef } from 'react';
import { formatSecondsAsCountdown } from 'Helper/formatter';

function Message({ data, currentUser }) {
    const isMine = parseInt(currentUser.id) === parseInt(data.user.id);

    const audioRef = useRef();
    const videoRef = useRef();

    const [isPlayingAudio, setIsPlayingAudio] = useState(false);
    const [audioDuration, setAudioDuration] = useState(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState(0);

    const [isPlayingVideo, setIsPlayingVideo] = useState(false);

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

    /* Load Message Content */
    const setMessageContent = () => {
        if (data.message_type === 'text') {
            return (
                <div className='wpwax-vm-message-content__inner--text'>
                    <p>{data.message}</p>
                </div>
            );
        } else if (data.message_type === 'video') {
            return (
                <div>
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
                    </div>
                    {data.message && (
                        <div className='wpwax-vm-message-content__inner--text wpwax-vm-mt-20'>
                            <p>{data.message}</p>
                        </div>
                    )}
                </div>
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
                            <p>{data.message}</p>
                        </div>
                    )}
                </>
            );
        }
    };

    return (
        <MessageBox
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
                <img
                    src={data.user.avater ? data.user.avater : author}
                    alt='Author Avater'
                />
            </div>
        </MessageBox>
    );
}

export default Message;
