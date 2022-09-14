import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ReactSVG } from 'react-svg';
import Record from './overview/Record.jsx';
import Upload from './overview/Upload.jsx';
import videoCamera from 'Assets/svg/icons/video-camera.svg';
import upload from 'Assets/svg/icons/cloud-upload.svg';

import { handleReplyModeChange } from '../../../../store/messages/actionCreator';

const Video = ({ sessionID, onSuccess }) => {
    const stages = {
        HOME: 'home',
        RECORD: 'record',
        UPLOAD: 'upload',
    };

    const [currentStage, setCurrentStage] = useState(stages.HOME);

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    function updateStage(event, stage) {
        event.preventDefault();

        setCurrentStage(stage);
    }

    /* Handle Close */
    const handleClose = (e) => {
        e.preventDefault();
        dispatch(handleReplyModeChange(false));
    };

    const backToHome = () => {
        setCurrentStage(stages.HOME);
    };

    if (currentStage === stages.HOME) {
        return (
            <div className='wpwax-vm-video-msg wpwax-vm-video-msg-home'>
                <a
                    href='#'
                    className='wpwax-vm-video-msg__close'
                    onClick={handleClose}
                >
                    <span className='dashicons dashicons-no-alt'></span>
                </a>
                <h4 className='wpwax-vm-video-home__title'>
                    How would you like to create this step?
                </h4>
                <div className='wpwax-vm-video-home__action'>
                    <a
                        href='#'
                        className='wpwax-vm-video-home__action--btn'
                        onClick={(e) => updateStage(e, stages.RECORD)}
                    >
                        <div className='wpwax-vm-video-home__action--icon'>
                            <ReactSVG src={videoCamera} />
                        </div>
                        <span className='wpwax-vm-video-home__action--text'>
                            Record Video
                        </span>
                    </a>
                    <a
                        href='#'
                        className='wpwax-vm-video-home__action--btn'
                        onClick={(e) => updateStage(e, stages.UPLOAD)}
                    >
                        <div className='wpwax-vm-video-home__action--icon'>
                            <ReactSVG src={upload} />
                        </div>
                        <span className='wpwax-vm-video-home__action--text'>
                            Upload Video
                        </span>
                    </a>
                </div>
            </div>
        );
    } else if (currentStage === stages.RECORD) {
        return (
            <Record
                backToHome={backToHome}
                sessionID={sessionID}
                onSuccess={onSuccess}
            />
        );
    } else if (currentStage === stages.UPLOAD) {
        return (
            <Upload
                backToHome={backToHome}
                sessionID={sessionID}
                onSuccess={onSuccess}
            />
        );
    }
};

export default Video;
