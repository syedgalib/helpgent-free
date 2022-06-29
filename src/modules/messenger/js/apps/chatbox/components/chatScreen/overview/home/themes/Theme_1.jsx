import { ReactSVG } from 'react-svg';
import { useDispatch, useSelector } from "react-redux";
import { changeChatScreen } from '../../../../../store/chatBox/actionCreator';
import { canReplay } from '../../../../../store/chatboxTemplate/hooks';

import { ChatboxForm } from "../style/Style.js";
import expander from "MessengerAssets/svg/icons/expand.svg";
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

function Theme_1() {
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
        const prettyDuration = formatTime( duration );
        
        if ( ! prettyDuration ) {
            return;
        }
        
        setGreetVideoTotalDuration( prettyDuration );
        greetVideo.current.addEventListener( 'timeupdate', updateGreetVideoElapsedTime );
    }

    function handleChatAction(type) {
        dispatch( changeChatScreen(type) );
    }

    function updateGreetVideoElapsedTime() {
        const currentTime = greetVideo.current.currentTime;
        const prettyCurrentTime = formatTime( currentTime );
        
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

    function isPausedGreetVideo() {
        if ( greetVideo.current && typeof greetVideo.current.paused !== 'undefined' && greetVideo.current.paused ) {
            return true;
        }

        return false;
    }

    function formatTime( timeInSecond ) {
       return ( ! isNaN( timeInSecond ) ) ? new Date( timeInSecond * 1000).toISOString().substring(14, 19) : '00:00';
    }

    return (
        <ChatboxForm>
            <div className="wpwax-vm-chatbox-wrap">
                <div className="wpwax-vm-chatbox-bg" >
                {  templateOptions.greet_video_url &&
				    <video 
                        ref={greetVideo} 
                        style={{objectFit: 'cover'}} 
                        width='100%' 
                        height='100%' 
                        src={templateOptions.greet_video_url}
                        onLoadedMetadata={handleLoadedGreetVideoMetadata}
                    >   
                    </video>
                }
                </div>
                
                <div className="wpwax-vm-chatbox-header">
                    <div className="wpwax-vm-chatbox-header__top">
                        <span className="wpwax-vm-timer">
                            <span className="wpwax-vm-count-time">{ greetVideoPlayedDuration }</span>
                            <span className="wpwax-vm-total-time"> - { greetVideoTotalDuration }</span>
                        </span>
                        <a href="#" className="wpwax-vm-fulscreen-trigger">
                            <ReactSVG src={expander} />
                        </a>
                    </div>

                    { 
                        templateOptions.greet_message && 
                        <h4 className="wpwax-vm-chatbox-title">
                            { templateOptions.greet_message }
                        </h4> 
                    }
                    
                </div>
                <div className="wpwax-vm-chatbox-inner">
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

export default Theme_1;