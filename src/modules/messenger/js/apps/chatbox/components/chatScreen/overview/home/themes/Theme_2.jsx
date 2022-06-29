import { useDispatch, useSelector } from "react-redux";
import { useRef } from 'react';
import { useState } from 'react';

import { canReplay } from '../../../../../store/chatboxTemplate/hooks';
import { formatTimeAsCountdown } from 'Helper/formatter';

import { changeChatScreen } from '../../../../../store/chatBox/actionCreator';

import { ChatboxForm } from "../style/Style.js";

import { ReactSVG } from 'react-svg';
import previewBg from "MessengerAssets/img/builder/bg.png";
import expander from "MessengerAssets/svg/icons/expand.svg";

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

    function handleChatAction(type) {
        console.log(type)
        dispatch(changeChatScreen(type));
        // dispatch(chatBoxActions.chatStep(1));
    }

    return (
        <ChatboxForm>
            <div className="wpwax-vm-chatbox-wrap wpwax-vm-chatbox-theme-2">
                <div className="wpwax-vm-chatbox-header">
                    { 
                        templateOptions.greet_message && 
                        <h4 className="wpwax-vm-chatbox-title">
                            { templateOptions.greet_message }
                        </h4> 
                    }
                </div>

                <div className="wpwax-vm-chatbox-inner">
                    <div className="wpwax-vm-chatbox-inner-action">
                        <span className="wpwax-vm-timer">
                            <span className="wpwax-vm-count-time">{ greetVideoPlayedDuration }</span>
                            <span className="wpwax-vm-total-time"> / { greetVideoTotalDuration }</span>
                        </span>
                        <a href="#" onClick={fullscreenGreetVideo} className="wpwax-vm-fulscreen-trigger">
                            <ReactSVG src={expander} />
                        </a>
                    </div>

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
                    </div>
                    
                    <a href="#" onClick={toggolePlayGreetVideo} className="wpwax-vm-btn-play"><i className={ ( isPausedGreetVideo() ) ? 'dashicons dashicons-controls-play' : 'dashicons dashicons-controls-pause' }></i></a>
                </div>

                <div className="wpwax-vm-chatbox-footer">
                    { templateOptions.chat_box_title && <h5 className="wpwax-vm-chatbox-footer__title">{ templateOptions.chat_box_title }</h5> }
                    
                    {
                        canReplay() && 
                        <div className="wpwax-vm-chatbox-footer__actions"> 
                        {
                            supportedReplayTypes.map( item => {
                                if ( ! templateOptions.can_replay_in.includes( item.type )  ) {
                                    return '';
                                }
    
                                return <a key={item.type} href="#" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" onClick={() => handleChatAction( item.type )}>{item.label}</a>
                            })
                        } 
                        </div>
                    }

                    { templateOptions.footer_message && <p className="wpwax-vm-chatbox-footer__text">{templateOptions.footer_message}</p> }
                    
                    <p className="wpwax-vm-chatbox-footer__bottom">Powered by <a href="#">WpWax</a></p>
                </div>
            </div>
        </ChatboxForm>
    );
}

export default Theme_2;