import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Record = ()=>{
    const [state, setState] = useState({
        recordStage: "permission"
    });
	
	const { recordStage } = state;
		if(recordStage === "permission"){
			return(
				<VideoRecordWrap>
					<h4>To record video, your browser will need to request access to your camera & microphone.</h4>
					<img src="" alt="" />
					<a href="#" className="wpwax-vm-btn wpwax-vm-btn-block wpwax-vm-btn-primary">Request Permission</a>
				</VideoRecordWrap>
			);
		}else if(recordStage === "staging"){

		}else if(recordStage === "start"){
			
		}else if(recordStage === "finish"){
			
		}else if(recordStage === "before-send"){
			
		}else if(recordStage === "progress"){
			
		}else if(recordStage === "success"){
			
		}	
}

export default Record;