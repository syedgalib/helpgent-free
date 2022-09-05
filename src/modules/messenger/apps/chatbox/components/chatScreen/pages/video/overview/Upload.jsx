import React, { useState, useEffect, useRef } from 'react';
import { VideoHomeWrap } from '../Style';

const Upload = () => {
    return (
        <VideoHomeWrap>
            <div className='wpwax-vm-video-home'>
                <h3>How would you like to create this step?</h3>
                <div className='wpwax-vm-video-home-btns'>
                    <a
                        href=''
                        className='wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-primary'
                    >
                        Record Video
                    </a>
                    <span>Or</span>
                    <a
                        href=''
                        className='wpwax-vm-btn wpwax-vm-btn-md wpwax-vm-btn-light'
                    >
                        Upload Video
                    </a>
                    <span className='wpwax-vm-short-text'>
                        Max file size: 300MB
                    </span>
                </div>
            </div>
        </VideoHomeWrap>
    );
};

export default Upload;
