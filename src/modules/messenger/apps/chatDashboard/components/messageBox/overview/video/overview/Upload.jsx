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
const Upload = () => {
    const [state, setState] = useState({
        step: ""
    });

    function handleVideo(step) {
        setState({
            ...state,
            step: step
        });
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
    const handleFileUpload = (e) => {
        e.preventDefault();
        const fileInput = document.getElementById("wpwax-vm-reply-ready-video");
        fileInput.click();

    }

    return (
        <VideoReplyWrap className="wpwax-vm-reply-ready wpwax-vm-reply-upload">
            <a href="" className="wpwax-vm-reply-close" onClick={handleClose}><span className="dashicons dashicons-no-alt"></span></a>
            <div className="wpwax-vm-reply-ready__video"></div>
            <div className="wpwax-vm-reply-ready__content">
                <MediaBox img={userImg} title={"Replying to Adnan…"} metaList={metaList} />
                <div className="wpwax-vm-reply-ready__text-form">
                    <form action="">
                        <div className="wpwax-vm-reply-ready__file-input">
                            <input type="file" name="wpwax-vm-reply-ready-video" id="wpwax-vm-reply-ready-video" />
                            <a href="#" className="wpawax-vm-reply-btn-upload" onClick={handleFileUpload}>Choose File</a>
                            <span className="wpwax-vm-dark-alert">or drag & drop here…</span>
                            <p>Works with .mp4, .mov & .webm. Max size 300MB!</p>
                        </div>
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
}

export default Upload;