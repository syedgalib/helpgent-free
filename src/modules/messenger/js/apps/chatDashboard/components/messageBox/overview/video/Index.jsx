import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReactSVG } from 'react-svg';
import Record from './overview/Record.jsx';
import Upload from './overview/Upload.jsx';
import videoCamera from "../../../../../../../assets/svg/icons/video-camera.svg";
import upload from "../../../../../../../assets/svg/icons/cloud-upload.svg";

import { handleMessageStageChange, handleReplyModeChange } from '../../../../store/messages/actionCreator';

const Video = () => {

	/* initialize Form Data */
	const { step } = useSelector(state => {
		return {
			step: state.messages.videoStage,
		};
	});
	// const [state, setState] = useState({
	// 	step: "home"
	// });

	/* Dispasth is used for passing the actions to redux store  */
	const dispatch = useDispatch();

	function handlevideoAction(e, stage) {
		e.preventDefault();
		dispatch(handleMessageStageChange(stage));
	}

	const handleClose = (e) => {
		e.preventDefault();
		dispatch(handleReplyModeChange(false));
	}

	// const { step } = state;
	console.log(step);
	if (step === "home") {
		return (
			<div className="wpwax-vm-video-msg wpwax-vm-video-msg-home">
				<a href="#" className="wpwax-vm-video-msg__close" onClick={handleClose}><span className="dashicons dashicons-no-alt"></span></a>
				<h4 className="wpwax-vm-video-home__title">How would you like to create this step?</h4>
				<div className="wpwax-vm-video-home__action">
					<a href="#" className="wpwax-vm-video-home__action--btn" onClick={(e) => handlevideoAction(e, "record")}>
						<div className="wpwax-vm-video-home__action--icon"><ReactSVG src={videoCamera} /></div>
						<span className="wpwax-vm-video-home__action--text">Record Video</span>
					</a>
					<a href="#" className="wpwax-vm-video-home__action--btn" onClick={(e) => handlevideoAction(e, "upload")}>
						<div className="wpwax-vm-video-home__action--icon"><ReactSVG src={upload} /></div>
						<span className="wpwax-vm-video-home__action--text">Upload Video</span>
					</a>
				</div>
			</div>
		);
	} else if (step === "record") {
		return (
			<Record />
		);
	} else if (step === "upload") {
		return (
			<Upload />
		);
	}
}

export default Video;