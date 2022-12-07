// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { useDispatch, useSelector } from "react-redux";
import { useRef } from 'react';
import { useState } from 'react';

import { changeChatScreen } from '../../../../../store/chatbox/actionCreator';
import { canReplay } from '../../../../../store/chatboxTemplate/hooks';

import { formatSecondsAsCountdown } from 'Helper/formatter';

import { ChatboxForm } from '../../../style/Style';
import expander from "Assets/svg/icons/expand.svg";
import miceIcon from 'Assets/svg/icons/mice.svg';
import recordIcon from 'Assets/svg/icons/screen-record.svg';
import textIcon from 'Assets/svg/icons/text.svg';
import playIcon from 'Assets/svg/icons/play.svg';
import pauseIcon from 'Assets/svg/icons/pause-solid.svg';
import videoIcon from 'Assets/svg/icons/video-camera.svg';

import sanitizeHtml from 'sanitize-html';
import { decodeHTMLEntities } from 'Helper/utils';

function Theme_1() {
    const dispatch = useDispatch();

    const { templateOptions, supportedReplayTypes, displayChatbox } = useSelector( state => {
        return {
			templateOptions: state.chatboxTemplate.template.options,
			supportedReplayTypes: state.chatboxTemplate.supportedReplayTypes,
            displayChatbox: state.chatbox.showChatbox
        };
    });

    const [ greetVideoTotalDuration, setGreetVideoTotalDuration ] = useState( '00:00' );
    const [ greetVideoPlayedDuration, setGreetVideoPlayedDuration ] = useState( '00:00' );

    const greetVideo = useRef();

    // Greet Video
    function handleLoadedGreetVideoMetadata() {
        greetVideo.current.play();

        const duration = greetVideo.current.duration;
        const prettyDuration = formatSecondsAsCountdown( duration );

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
        const prettyCurrentTime = formatSecondsAsCountdown( currentTime );

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
        dispatch( changeChatScreen(type) );
    }

    const iconContent = (button) => {
        if (button === 'video') {
            return <ReactSVG src={videoIcon} />
        } else if (button === 'screen_record') {
            return <ReactSVG src={recordIcon} />
        } else if (button === 'voice') {
            return <ReactSVG src={miceIcon} />
        } else if (button === 'text') {
            return <ReactSVG src={textIcon} />
        }
    }

    return (
        <ChatboxForm>
            <div className="wpwax-vm-chatbox-wrap wpwax-vm-d-flex wpwax-vm-flex-direction-column">
                {
                    displayChatbox ? 
                    <div className="wpwax-vm-chatbox-bg">
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
                    </div> : null
                }
                
                <div className="wpwax-vm-chatbox-header wpwax-vm-custom-scrollbar">
                    {
                        templateOptions.greet_video_url !== "" ?
                        <div className="wpwax-vm-chatbox-header__top">
                            <span className="wpwax-vm-timer">
                                <span className="wpwax-vm-count-time">{ greetVideoPlayedDuration }</span>
                                <span className="wpwax-vm-total-time"> / { greetVideoTotalDuration }</span>
                            </span>
                            <a href="#" onClick={fullscreenGreetVideo} className="wpwax-vm-fulscreen-trigger">
                                <ReactSVG src={expander} />
                            </a>
                        </div> : null
                    }

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
                        templateOptions.greet_video_url !== "" ?
                            <a href="#" onClick={toggolePlayGreetVideo} className="wpwax-vm-btn-play">
                                <ReactSVG src={ isPausedGreetVideo() ? playIcon : pauseIcon } />
                            </a> : null
                    }

                </div>

                <div className={templateOptions.creditTextVisibility ? "wpwax-vm-chatbox-footer wpwax-vm-chatbox-footer-copyright" : "wpwax-vm-chatbox-footer"}>
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
                                        <span>{replayType.type === "screen_record" ? "Screen" : replayType.label}</span>
                                    </a>
                                }
                            )
                        }
                        </div>
                    }

                    {
                        templateOptions.show_footer && templateOptions.footer_message ? <p className="wpwax-vm-chatbox-footer__text">{templateOptions.footer_message}</p> : null 
                    }

                    {
                        templateOptions.creditTextVisibility ? <div className="wpwax-vm-chatbox-footer__bottom" dangerouslySetInnerHTML={{ __html: sanitizeHtml( decodeHTMLEntities( templateOptions.creditTextDom ) ) }}></div> : null
                    }
                </div>
            </div>
        </ChatboxForm>
    );
}

export default Theme_1;