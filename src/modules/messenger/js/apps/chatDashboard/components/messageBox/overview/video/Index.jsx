import React, { useState } from "react";
import { ReactSVG } from 'react-svg';
import Record from './overview/Record.jsx';
import Upload from './overview/Upload.jsx';
import videoCamera from "../../../../../../../assets/svg/icons/video-camera.svg";
import upload from "../../../../../../../assets/svg/icons/cloud-upload.svg";

const Video = () => {
	const [state, setState] = useState({
		step: "home"
	});

	function handlevideoAction(e, step) {
		e.preventDefault();
		setState({
			step: step
		});
	}

	const { step } = state;
	if (step === "home") {
		return (
			<div className="wpwax-vm-video-msg wpwax-vm-video-msg-home">
				<a href="#" className="wpwax-vm-video-msg__close"><span className="dashicons dashicons-no-alt"></span></a>
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