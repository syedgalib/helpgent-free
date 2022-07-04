import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Record from './overview/Record';
// import { VideoHomeWrap }  from './Style';

const Voice = ()=>{
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
	return(
		<Record />
	)
    // if( step === "record"){
	// 	return(
	// 		<Record />
	// 	);
	// }else if(step === "upload"){
	// 	return(
	// 		<Upload />
	// 	);
	// }
}

export default Voice;