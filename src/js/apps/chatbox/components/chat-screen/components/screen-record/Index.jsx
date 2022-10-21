import React, { useState } from 'react';
import ReactSVG from 'react-inlinesvg';
import { showToggler } from "../../../../store/chatbox/actionCreator";
import minimizeIcon from 'Assets/svg/icons/window-minimize.svg';
import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import ScreenRecordWrap from './Style.js';
import { useDispatch, useSelector } from "react-redux";

function ScreenRecord() {

	const dispatch = useDispatch();

	const [state, setState] = useState({
		recordStage: "startScreen"
    });

	const handleMinizeScreen = ()=>{
		dispatch(showToggler());
	}

	const handleSelectScreen = e =>{
		e.preventDefault();
		if(state.recordStage === "startScreen"){
			setState({
				...state,
				recordStage: "stopScreen"
			});
		}else{
			setState({
				...state,
				recordStage: "beforeSend"
			});
		}
	}

	const goBack = e => {
		e.preventDefault();
		setState({
			...state,
			recordStage: "startScreen"
		});
	}

	if(state.recordStage === "startScreen" || state.recordStage === "stopScreen"){
		return (
			<ScreenRecordWrap className="wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-chat-screen">
				
				<div className="wpwax-hg-screenrecord-box">
					<div className="wpwax-hg-screenrecord-top">
						<span className="wpwax-hg-record-timer">00:00</span>
						<a href="#" className="wpwax-hg-btn-minimize" onClick={handleMinizeScreen}>
							<ReactSVG src={minimizeIcon} />
						</a>
					</div>
					<div className="wpwax-hg-screenrecord-action">
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-block wpwax-vm-btn-primary" onClick={e=>handleSelectScreen(e)}>
							{
								state.recordStage === "startScreen" ? "Select Screen" : "Stop Recording"
							}
						</a>
					</div>
				</div>
				
			</ScreenRecordWrap>
		)
	}else if(state.recordStage === "beforeSend"){
		return(
			<ScreenRecordWrap className='wpwax-vm-record-ready'>
				<form action='#' className='wpwax-vm-form'>
					<div className='wpwax-vm-recored-video'>
						<div className='wpwax-vm-recorded-preview wpax-vm-preview-bg'>
							<video controls src=""></video>
						</div>
					</div>
					<div className='wpwax-vm-form-bottom'>
						<p>Ready to send?</p>
						<a
							href='#'
							className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary wpwax-vm-mb-10'
						>
							Send
							<ReactSVG src={paperPlan} />
						</a>
						<a
							href='#'
							onClick={(e) => goBack(e)}
							className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-light'
						>
							Cancel
						</a>
					</div>
				</form>
			</ScreenRecordWrap>
		)
		
	}

	
}

export default ScreenRecord;
