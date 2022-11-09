import { useDispatch, useSelector } from "react-redux";
import { useRef } from 'react';
import { useState } from 'react';

import { canReplay } from '../../../../../store/chatboxTemplate/hooks';
import { formatTimeAsCountdown } from 'Helper/formatter';

import { changeChatScreen } from '../../../../../store/chatbox/actionCreator';

import { ChatboxForm } from '../../../style/Style';

// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import expander from "Assets/svg/icons/expand.svg";
import miceIcon from 'Assets/svg/icons/mice.svg';
import recordIcon from 'Assets/svg/icons/s-record.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import playIcon from 'Assets/svg/icons/play.svg';
import pauseIcon from 'Assets/svg/icons/pause-solid.svg';
import videoIcon from 'Assets/svg/icons/video-camera.svg';

function Theme_2() {
    const dispatch = useDispatch();

    const { templateOptions, supportedReplayTypes } = useSelector( state => {
        return {
			templateOptions: state.chatboxTemplate.template.options,
			supportedReplayTypes: state.chatboxTemplate.supportedReplayTypes,
        };
    });

    const [ greetVideoTotalDuration, setGreetVideoTotalDuration ] = useState( '00:00' );
    const [ greetVideoPlayedDuration, setGreetVideoPlayedDuration ] = useState( '00:00' );

    const greetVideo = useRef();

    // Greet Video
    function handleLoadedGreetVideoMetadata() {
        greetVideo.current.play();

        const duration = greetVideo.current.duration;
        const prettyDuration = formatTimeAsCountdown( duration );

        if ( ! prettyDuration ) {
            return;
        }

        setGreetVideoTotalDuration( prettyDuration );
        greetVideo.current.addEventListener( 'timeupdate', updateGreetVideoElapsedTime );
    }

    function updateGreetVideoElapsedTime() {
        if ( ! greetVideo.current ) {
            return;
        }

        const currentTime = greetVideo.current.currentTime;
        const prettyCurrentTime = formatTimeAsCountdown( currentTime );

        if ( ! prettyCurrentTime ) {
            return;
        }

        setGreetVideoPlayedDuration( prettyCurrentTime );
    }

    function toggolePlayGreetVideo( event ) {
        event.preventDefault();

        if ( greetVideo.current.paused ) {
            greetVideo.current.play();
            return;
        }

        greetVideo.current.pause();
    }

    function fullscreenGreetVideo( event ) {
        event.preventDefault();

        if (greetVideo.current.requestFullscreen) {
            greetVideo.current.requestFullscreen();
        } else if (greetVideo.current.webkitRequestFullscreen) { /* Safari */
            greetVideo.current.webkitRequestFullscreen();
        } else if (greetVideo.current.msRequestFullscreen) { /* IE11 */
            greetVideo.current.msRequestFullscreen();
        }
    }

    function isPausedGreetVideo() {
        if ( greetVideo.current && typeof greetVideo.current.paused !== 'undefined' && greetVideo.current.paused ) {
            return true;
        }

        return false;
    }

    function handleChatAction(event,type) {
        event.preventDefault();
        if(greetVideo.current){
            greetVideo.current.pause();
        }
        dispatch(changeChatScreen(type));
    }

    const iconContent = (button) => {
        if (button === 'video') {
            return <ReactSVG src={videoIcon} />
        } else if (button === 'screenRecord') {
            return <ReactSVG src={recordIcon} />
        } else if (button === 'voice') {
            return <ReactSVG src={miceIcon} />
        } else if (button === 'text') {
            return <ReactSVG src={textIcon} />
        }
    }

    return (
        <ChatboxForm>
            <div className="wpwax-vm-chatbox-wrap wpwax-vm-chatbox-theme-2 wpwax-vm-d-flex wpwax-vm-flex-direction-column">
                <div className="wpwax-vm-chatbox-header">
                    {
                        templateOptions.greet_message &&
                        <h4 className="wpwax-vm-chatbox-title">
                            { templateOptions.greet_message }
                        </h4>
                    }

                    {
                        templateOptions.show_description ?
                            <span className="wpwax-vm-chatbox-description">
                                { templateOptions.description }
                            </span> : null
                    }
                </div>

                <div className="wpwax-vm-chatbox-inner wpwax-vm-flex-grow-1">
                    {
                        templateOptions.greet_video_url &&
                        <div className="wpwax-vm-chatbox-inner-action">
                            <span className="wpwax-vm-timer">
                                <span className="wpwax-vm-count-time">{ greetVideoPlayedDuration }</span>
                                <span className="wpwax-vm-total-time"> / { greetVideoTotalDuration }</span>
                            </span>
                            <a href="#" onClick={fullscreenGreetVideo} className="wpwax-vm-fulscreen-trigger">
                                <ReactSVG src={expander} />
                            </a>
                        </div>
                    }

                    <div className="wpwax-vm-chatbox-img">
                        {  templateOptions.greet_video_url &&
                            <video
                                ref={greetVideo}
                                style={{objectFit: 'cover'}}
                                width='100%'
                                height='100%'
                                src={templateOptions.greet_video_url}
                                onLoadedMetadata={handleLoadedGreetVideoMetadata}
                                onClick={toggolePlayGreetVideo}
                            >
                            </video>
                        }
                        {  templateOptions.greet_image_url && <img src={templateOptions.greet_image_url} alt="Wpwax Support Video Plugin" /> }
                    </div>
                    {
                        templateOptions.greet_video_url &&
                            <a href="#" onClick={toggolePlayGreetVideo} className="wpwax-vm-btn-play">
                                {
                                    ( isPausedGreetVideo() ) ? <ReactSVG src={playIcon} /> : <ReactSVG src={pauseIcon} />
                                }
                            </a>
                    }

                </div>

                <div className="wpwax-vm-chatbox-footer">
                    { templateOptions.chat_options_title && <h5 className="wpwax-vm-chatbox-footer__title">{ templateOptions.chat_options_title }</h5> }

                    {
                        canReplay() &&
                        <div className="wpwax-vm-chatbox-footer__actions">
                        {
                            templateOptions.can_replay_in && templateOptions.can_replay_in.length && templateOptions.can_replay_in.map(
                                item => {
                                    if (
                                        ! supportedReplayTypes.map( replayTypeItem => replayTypeItem.type ).includes( item )
                                    ) {
                                        return '';
                                    }

                                    const replayType = supportedReplayTypes.filter( replayTypeItem => replayTypeItem.type === item )[0];

                                    return <a key={replayType.type} href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" onClick={( event ) => handleChatAction( event, replayType.type )}>
                                        { iconContent(replayType.type) }
                                        <span>{ replayType.type === "screen_record" ? "Screen" : replayType.label }</span>
                                    </a>
                                }
                            )
                        }
                        </div>
                    }
                    <p className="wpwax-vm-chatbox-footer__text">
                        {
                            templateOptions.show_footer && templateOptions.footer_message && templateOptions.footer_message
                        }
                    </p>

                    <p className="wpwax-vm-chatbox-footer__bottom">Powered by <a href="#">WpWax</a></p>
                </div>
            </div>
        </ChatboxForm>
    );
}

export default Theme_2;