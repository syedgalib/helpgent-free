import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { showChatbox } from "../../store/chatbox/actionCreator";
import AvatarWrap from "./Style";
import intro from 'Assets/img/intro.gif';

function Avatar() {
	const videoRef = useRef();
	const dispatch = useDispatch();

	useEffect(() => {
		
		if(videoRef.current){
			videoRef.current.muted = true
		}
		
	  }, [displayChatbox]);

	const { templateOptions, displayChatbox } = useSelector( state => {
        return {
			templateOptions: state.chatboxTemplate.template.options,
			displayChatbox: state.chatbox.showChatbox
        };
    });

	function clickHandler(e) {
		e.preventDefault();
		dispatch(showChatbox());
	}
	if(videoRef.current){
		videoRef.current.muted = true
	}
	
	return (
		!displayChatbox ?
		<AvatarWrap className="wpwax-vm-chatbox-content" onClick={ clickHandler }>
			{
				templateOptions.greet_video_url ? <video style={{width: '120px'}} ref={ videoRef } preload="auto" loop autoPlay muted><source src={templateOptions.greet_video_url} type="video/mp4" /></video> : null
			}
			{
				templateOptions.greet_image_url ? <img className="wpwwax-vm-avatar" src={ templateOptions.greet_image_url } alt="Avatar" /> : null
			}
			{
				!templateOptions.greet_video_url && !templateOptions.greet_image_url ? <img className="wpwwax-vm-avatar" src={ intro } alt="Avatar" /> : null
			}
		</AvatarWrap> : null
	);
}

export default Avatar;