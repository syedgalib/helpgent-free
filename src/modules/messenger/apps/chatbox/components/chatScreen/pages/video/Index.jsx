import React, { useState } from 'react';
import Record from './overview/Record.jsx';
import Upload from './overview/Upload.jsx';
import { VideoHomeWrap } from './Style';

const Video = () => {
    const stages = {
        HOME: 'home',
        RECORD: 'record',
        UPLOAD: 'upload',
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFileErrorMessage, setSelectedFileErrorMessage] =
        useState('');
    const [currentStage, setCurrentStage] = useState(stages.HOME);

    function prepareForUpload(event) {
        const file = event.target.files.length ? event.target.files[0] : null;

        setSelectedFile(file);

        if (!file) {
            return;
        }

        if (file.size > getMaxUploadSize()) {
            setSelectedFileErrorMessage(
                'The file exceeded the max upload size'
            );
            return;
        }

        setCurrentStage(stages.UPLOAD);
    }

    function back() {
        setCurrentStage(stages.HOME);
    }

    function getSupportedVideoExtensions() {
        if (
            !wpWaxCustomerSupportApp_CoreScriptData.supported_video_extensions
        ) {
            return '';
        }

        const supported_video_extensions =
            wpWaxCustomerSupportApp_CoreScriptData.supported_video_extensions;

        if (!Array.isArray(supported_video_extensions)) {
            return '';
        }

        return supported_video_extensions.join(', ').trim();
    }

    function getMaxUploadSize() {
        if (isNaN(wpWaxCustomerSupportApp_CoreScriptData.max_upload_size)) {
            return 0;
        }

        return parseInt(wpWaxCustomerSupportApp_CoreScriptData.max_upload_size);
    }

    function getFormattedMaxUploadSize() {
        const max_upload_size = getMaxUploadSize();

        const sizeInKB = max_upload_size / 1024;
        const sizeInMB = sizeInKB / 1024;

        const size = sizeInMB < 1 ? `${sizeInKB} KB` : `${sizeInMB} MB`;

        return size;
    }

    if (currentStage === stages.HOME) {
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
                            onClick={() => setCurrentStage(stages.RECORD)}
                        >
                            Record Video
                        </a>
                        <span>Or</span>

                        <div className=''>
                            <input
                                style={{ display: 'none' }}
                                type='file'
                                accept={getSupportedVideoExtensions()}
                                name='attachment_video'
                                id='attachment_video'
                                onChange={(e) => prepareForUpload(e)}
                            />

                            <label
                                htmlFor='attachment_video'
                                className='wpwax-vm-btn wpwax-vm-btn-block wpwax-vm-btn-lg wpwax-vm-btn-light'
                            >
                                Upload Video
                            </label>
                        </div>
                    </div>
                    <span className='wpwax-vm-short-text'>
                        Max file size: {getFormattedMaxUploadSize()}
                    </span>
                    {selectedFileErrorMessage ? (
                        <p className='wpwax-vm-text-danger'>
                            {selectedFileErrorMessage}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
            </VideoHomeWrap>
        );
    } else if (currentStage === stages.RECORD) {
        return <Record />;
    } else if (currentStage === stages.UPLOAD) {
        return <Upload file={selectedFile} back={back} />;
    }
};

export default Video;
