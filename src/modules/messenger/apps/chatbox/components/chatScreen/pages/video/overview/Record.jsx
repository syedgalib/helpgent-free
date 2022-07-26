import React, { useState } from "react";
import { ReactSVG } from 'react-svg';
import { VideoRecordWrap } from './../Style';
import { ContactFormWrap } from '../../../style/Style';

/* Images */
import permissionImg from 'Assets/img/chatbox/permission.png';
import play from 'Assets/svg/icons/play.svg'
import checkCircle from 'Assets/svg/icons/check-circle.svg'
import expander from "Assets/svg/icons/expand.svg";
import paperPlan from "Assets/svg/icons/paper-plane.svg";
import previewBg from "Assets/img/builder/bg.png";
import video from "Assets/videos/arabic.mp4"

const Record = ()=>{
    const [state, setState] = useState({
        recordStage: "permission",
		startRecording: false
    });

	const { recordStage, startRecording } = state;

	function updateRecordStage(e,stage){
		e.preventDefault();
		setState({
            ...state,
            recordStage: stage,
        });
	}
	function handleRecordAction(e){
		e.preventDefault();
		if(startRecording){
			setState({
				recordStage: "ready",
				startRecording: true
			});
		}else{
			setState({
				...state,
				startRecording: true
			});
		}
	}
	function handleSend(e){
		e.preventDefault();
		setState({
			...state,
			recordStage: "before-send",
		});
	}
	function handleSendVideo(e){
		e.preventDefault();
		setState({
			...state,
			recordStage: "progress",
		});
		setTimeout(() => {
			setState({
				...state,
				recordStage: "success",
			});
		}, 3000);
	}
	
	if(recordStage === "permission"){
		return(
			<VideoRecordWrap className="wpwax-vm-record-permission">
				<h4 className="wpwax-video-screen-title">To record video, your browser will need to request access to your camera & microphone.</h4>
				<img src={ permissionImg } alt="wpwax video support" />
				<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary" onClick={ (e)=> updateRecordStage(e,"staging") }>Request Permission</a>
			</VideoRecordWrap>
		);
	}else if(recordStage === "staging"){
		return(
			<VideoRecordWrap className="wpwax-vm-record-staging">
				<video src={ video }></video>
				<div className="wpwax-vm-record-staging__top">
					<h4 className="wpwax-vm-record-staging__title">
						Replying to Tanjim...
						{
							startRecording?
							<span className="wpwax-vm-timer">
								<span className="wpwax-vm-sec">00</span>
								<span className="wpwax-vm-seperator">:</span>
								<span className="wpwax-vm-min">00</span>
							</span>:''
						}
					</h4>
					<a href="#" className="wpwax-vm-record-staging__btn-expand"><ReactSVG src={ expander } /></a>
				</div>
				<div className={startRecording ? "wpwax-vm-record-staging__action wpwax-vm-record-start" : "wpwax-vm-record-staging__action hgfhf"}>
					<a href="#" className="wpwax-vm-btn-record" onClick={(e)=>handleRecordAction(e)}></a>
				</div>
			</VideoRecordWrap>
		)
	}else if(recordStage === "ready"){
		return(
			<VideoRecordWrap className="wpwax-vm-record-ready">
				<form action="" className="wpwax-vm-form">
					<div className="wpwax-vm-text-reply">
						<div className="wpwax-vm-form-group">
							<input type="text" className="wpwax-vm-form__element" name="wpwax-vm-reply" placeholder="Type your text..."/>
						</div>
					</div>
					<div className="wpwax-vm-recored-video">
						<div className="wpwax-vm-recorded-preview wpax-vm-preview-bg" style={{backgroundImage: `url("${ previewBg }")`}}></div>
						<a href="#" className="wpwax-vm-recored-video__play"><ReactSVG src={ play } /></a>
					</div>
					<div className="wpwax-vm-form-bottom">
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary" onClick={ (e)=> handleSend(e) }>Send<ReactSVG src={ paperPlan } /></a>
						<a href="#" className="wpwax-vm-btn-link">Cancel</a>
					</div>
				</form>
			</VideoRecordWrap>
		);
	}else if(recordStage === "before-send"){
		return(
			<ContactFormWrap>
				<div className="wpwax-vm-contact-form">
					<h4 className="wpwax-vm-contact-form__title">Before you go, please leave your contact details so we can get back to you…</h4>
					<form action="" className="wpwax-vm-form">
						<div className="wpwax-vm-form-group">
							<input type="text" className="wpwax-vm-form__element" placeholder="Your name*"/>
						</div>
						<div className="wpwax-vm-form-group">
							<input type="text" className="wpwax-vm-form__element" placeholder="Your email*" />
						</div>
						<div className="_wpwax-vm-form__bottom">
							<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary" onClick={ (e)=> handleSendVideo(e) }>Send<ReactSVG src={ paperPlan } /></a>
						</div>
					</form>
				</div>
			</ContactFormWrap>
		);
	}else if(recordStage === "progress"){
		return(
			<VideoRecordWrap className="wpwax-vm-record-send-progress">
				<div className="wpwax-vm-record-send-progress__content">
					<div className="wpwax-vm-record-send-progress__bar">
						<span>Sending</span>
					</div>
					<p>We’re currently uploading your response.</p>
					<p className="wpwax-vm-danger-text">Please don’t leave this page!</p>
				</div>
			</VideoRecordWrap>
		);
	}else if(recordStage === "success"){
		return(
			<VideoRecordWrap className="wpwax-vm-record-send-success">
				<div className="wpwax-vm-record-send-success__top">
					<span className="wpwax-vm-record-send-success__check">
						<ReactSVG src={ checkCircle } />
					</span>
					<h4>Success! <br></br> Thank you for answering</h4>
				</div>
				<div className="wpwax-vm-record-send-success__content">
					<h3 className="wpwax-vm-record-send-success__title">Lorem Ipsum Title</h3>
					<p>Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface</p>
				</div>
				<div className="wpwax-vm-record-send-success__bottom">
					<a href="#" className="wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary">Try for Free</a>
				</div>
			</VideoRecordWrap>
		);
	}
}

export default Record;