import React, { useState } from "react";
import { ReactSVG } from 'react-svg';
import { useSelector, useDispatch } from "react-redux";
import MediaBox from "Components/MediaBox.jsx";
import { VideoReplyWrap } from '../Style';
import userImg from "Assets/img/chatdashboard/user.png";
import previewBg from "Assets/img/chatdashboard/record-bg.png";
import plane from "Assets/svg/icons/paper-plane.svg";
import expand from "Assets/svg/icons/expand.svg";

import { handleMessageStageChange } from '../../../../../store/messages/actionCreator';

const metaList = [
    {
        type: "email",
        text: "sample@gmail.com"
    }
];

const Record = () => {
    const [state, setState] = useState({
        recordingStage: "pause",
        videoConainer: "full"
    });
    const { recordingStage } = state

    const handleRecording = (e) => {
        e.preventDefault();
        if (recordingStage === "pause") {
            setState({
                ...state,
                recordingStage: "start"
            });
        } else if (recordingStage === "start") {
            setState({
                ...state,
                recordingStage: "submit"
            });
        }
    }

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const handleBack = (e) => {
        e.preventDefault();
        setState({
            ...state,
            recordingStage: "start"
        });
    }
    const handleClose = (e) => {
        e.preventDefault();
        dispatch(handleMessageStageChange("home"));
    }

    if (recordingStage === "submit") {
        return (
            <VideoReplyWrap className="wpwax-vm-reply-ready">
                <a href="" className="wpwax-vm-reply-close" onClick={handleClose}><span className="dashicons dashicons-no-alt"></span></a>
                <div className="wpwax-vm-reply-ready__video">
                    <div className="wpwax-vm-reply-video-bg">
                        <img src={previewBg} alt="Wpwax Video Support Plugin" />
                    </div>
                    <div className="wpwax-vm-reply-ready__video--top">
                        <span className="wpwax-vm-video-timer">
                            <span className="wpwax-vm-time-count">00:00/</span>
                            <span className="wpwax-vm-time-total">00:20</span>
                        </span>
                        <a href="#" className="wpwax-vm-video-expander"><ReactSVG src={expand} /></a>
                    </div>
                    <a href="#" className="wpwax-vm-video_play"><span className="dashicons dashicons-controls-play"></span></a>
                </div>
                <div className="wpwax-vm-reply-ready__content">
                    <MediaBox img={userImg} title={"Replying to Adnan…"} metaList={metaList} />
                    <div className="wpwax-vm-reply-ready__text-form">
                        <form action="">
                            <div className="wpwax-vm-reply-ready__text-form-input">
                                <textarea name="wpwax-vm-reply-ready-text" id="wpwax-vm-reply-ready-text" placeholder="Type your text..."></textarea>
                            </div>
                            <div className="wpwax-vm-reply-ready__text-form--action">
                                <a href="#" className="wpwax-vm-reply-ready-btn wpwax-vm-btn-back" onClick={handleBack}>
                                    <span className="dashicons dashicons-arrow-left-alt"></span>
                                    <span className="wpwax-vm-reply-ready-btn__text">Back</span>
                                </a>
                                <a href="#" className="wpwax-vm-reply-ready-btn wpwax-vm-btn-send">
                                    <span className="wpwax-vm-reply-ready-btn__text">Send</span>
                                    <ReactSVG src={plane} />
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </VideoReplyWrap>
        )
    } else {
        return (
            <VideoReplyWrap className={recordingStage === "pause" ? "wpwax-vm-reply-pause" : "wpwax-vm-reply-start"}>
                <div className="wpwax-vm-reply-video-bg" style={{ backgroundImage: `url("${previewBg}")` }}></div>
                <div className="wpwax-vm-reply-top">
                    <h4>
                        Replying to Adnan…
                        {
                            recordingStage === "start" ? <span className="wpwax-vm-timer">0:20</span> : ""
                        }
                    </h4>
                    <a href="" className="wpwax-vm-reply-close" onClick={handleClose}><span className="dashicons dashicons-no-alt"></span></a>
                </div>
                <div className="wpwax-vm-reply-bottom">
                    <a href="" className="wpwax-vm-btn-record" onClick={handleRecording}></a>
                </div>
            </VideoReplyWrap>
        )
    }
}

export default Record;