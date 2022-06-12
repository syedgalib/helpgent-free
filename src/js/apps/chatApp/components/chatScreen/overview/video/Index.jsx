import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Record from './overview/Record';
import Upload from './overview/Upload';
import VideoHomeWrap  from './Style';

const Video = ()=>{
	const { videoFormData } = useSelector(state => {
        return {
            videoFormData: state,
        };
    });
	console.log(videoFormData);
    const [state, setState] = useState({
        step: "home"
    });

	function handleVideo(step){
		setState({
            ...state,
            step: step
        });
	}
	
	const { step } = state;
    if(step === "home"){
		return(
			<VideoHomeWrap>
				<div className="wpwax-vm-video-home">
					<h3>How would you like to create this step?</h3>
					<div className="wpwax-vm-video-home-btns">
						<a href="" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary" onClick={() => handleVideo("record")}>Record Video</a>
						<span>Or</span>
						<a href="" className="wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-light" onClick={() => handleVideo("upload")}>Upload Video</a>
						<span className="wpwax-vm-short-text">Max file size: 300MB</span>
					</div>
				</div>
			</VideoHomeWrap>
		);
	}else if( step === "record"){
		return(
			<Record />
		);
	}else if(step === "upload"){
		return(
			<Upload />
		);
	}
}

export default Video;