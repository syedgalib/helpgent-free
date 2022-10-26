import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import Record from './components/Record.jsx';
import Upload from './components/Upload.jsx';
import videoCamera from 'Assets/svg/icons/video-camera.svg';
import upload from 'Assets/svg/icons/cloud-upload.svg';

import { handleReplyModeChange } from '../../../../store/messages/actionCreator';

const Video = ({ sessionID, onSuccess, replayingTo }) => {
    const stages = {
        HOME: 'home',
        RECORD: 'record',
        UPLOAD: 'upload',
    };

    const [currentStage, setCurrentStage] = useState(stages.HOME);

    /* Dispasth is used for passing the actions to redux store  */
    const dispatch = useDispatch();

    const updateStage = (event, stage) => {
        event.preventDefault();
        
        setCurrentStage(stage);
        dispatch(handleReplyModeChange(true));
    };

    const handleRecord = async (event) => {
        event.preventDefault();

        const can_record_video = await canRecordVideo();

        if (!can_record_video) {
            return;
        }

        setCurrentStage(stages.RECORD);
        dispatch(handleReplyModeChange(true));
    };

    // canRecordVideo
    const canRecordVideo = async function () {
        const needPermission = await checkIfNeedPermission();

        if (needPermission) {
            const hasPermission = await requestPermission();

            if (!hasPermission) {
                alert(
                    'Please grant the requested permission to record the video'
                );
                return false;
            }

            return true;
        }

        return true;
    };

    // checkIfNeedPermission
    const checkIfNeedPermission = async function () {
        try {
            const microphonePermission = await navigator.permissions.query({
                name: 'microphone',
            });

            const cameraPermission = await navigator.permissions.query({
                name: 'camera',
            });

            return (
                microphonePermission.state !== 'granted' ||
                cameraPermission.state !== 'granted'
            );
        } catch (_) {
            return true;
        }
    };

    // requestPermission
    const requestPermission = async function () {
        try {
            await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
                video: { facingMode: 'user' },
            });

            return true;
        } catch (error) {
            console.log({ error });

            return false;
        }
    };

    /* Handle Close */
    const handleClose = (event) => {
        event.preventDefault();
        dispatch(handleReplyModeChange(false));
    };

    const backToHome = () => {
        setCurrentStage(stages.HOME);
    };

    if (currentStage === stages.HOME) {
        return (
            <div className='wpwax-vm-video-msg wpwax-vm-video-msg-home'>
                <h4 className='wpwax-vm-video-home__title'>
                    How would you like to create this step?
                </h4>
                <div className='wpwax-vm-video-home__action'>
                    <a
                        href='#'
                        className='wpwax-vm-video-home__action--btn'
                        onClick={handleRecord}
                    >
                        <span className='wpwax-vm-video-home__action--icon'>
                            <ReactSVG src={videoCamera} />
                        </span>
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
                sessionID={sessionID}
                backToHome={backToHome}
                onSuccess={onSuccess}
                replayingTo={replayingTo}
            />
        );
    } else if (currentStage === stages.UPLOAD) {
        return (
            <Upload
                sessionID={sessionID}
                backToHome={backToHome}
                onSuccess={onSuccess}
                replayingTo={replayingTo}
            />
        );
    }
};

export default Video;
