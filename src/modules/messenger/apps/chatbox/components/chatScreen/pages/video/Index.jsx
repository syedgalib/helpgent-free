import React, { useState } from 'react';
import Record from './overview/Record.jsx';
import Upload from './overview/Upload.jsx';
import { VideoHomeWrap } from './Style';

const Video = () => {
    const [state, setState] = useState({
        step: 'home',
    });

    function handleVideo(step) {
        setState({
            ...state,
            step: step,
        });
    }

    const { step } = state;

    if (step === 'home') {
        return (
            <VideoHomeWrap>
                <div className='wpwax-vm-video-home'>
                    <h3 className='wpwax-vm-video-home__title'>
                        How would you like to create this step?
                    </h3>
                    <div className='wpwax-vm-video-home__btns'>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-primary'
                            onClick={() => handleVideo('record')}
                        >
                            Record Video
                        </a>
                        <span>Or</span>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-light'
                            onClick={() => handleVideo('upload')}
                        >
                            Upload Video
                        </a>
                    </div>
                    <span className='wpwax-vm-short-text'>
                        Max file size: 300MB
                    </span>
                </div>
            </VideoHomeWrap>
        );
    } else if (step === 'record') {
        return <Record />;
    } else if (step === 'upload') {
        return <Upload />;
    }
};

export default Video;
