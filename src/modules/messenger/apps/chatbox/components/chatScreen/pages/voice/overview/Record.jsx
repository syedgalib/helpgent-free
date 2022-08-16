import React, { useState, useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';
import { RecorderWrap } from '../Style';
import permissionImg from 'Assets/img/chatbox/permission.png';
import play from 'Assets/svg/icons/play.svg';
import pause from 'Assets/svg/icons/pause-solid.svg';
import previewBg from 'Assets/img/builder/bg.png';

import RecordRTC from 'recordrtc';

const Record = () => {
    const audioRef = useRef();

    const [state, setState] = useState({
        recordStage: 'permission',
        isRecording: false,
        permissionDenied: false,
    });

    const [recorder, setRecorder] = useState(null);
    const [recordedAudioBlob, setRecordedAudioBlob] = useState(null);
    const [recordedAudioURL, setRecordedAudioURL] = useState('');
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);

    // Init State
    useState(function () {
        check_if_need_permission().then(function (status) {
            if (!status) {
                updateRecordStage('record');
            }
        });
    }, []);

    useEffect(
        function () {
            if (recorder) {
                recorder.startRecording();
            }
        },
        [recorder]
    );

    function updateRecordStage(stage) {
        setState({
            ...state,
            recordStage: stage,
        });
    }

    async function check_if_need_permission() {
        try {
            const permission = await navigator.permissions.query({
                name: 'microphone',
            });

            return permission.state !== 'granted';
        } catch (_) {
            return true;
        }
    }

    async function requestPermission() {
        try {
            await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });

            updateRecordStage('record');
        } catch (error) {
            console.log({ error });

            setState({
                ...state,
                permissionDenied: true,
            });
        }
    }

    function updateRecordingStatus(status) {
        setState({
            ...state,
            isRecording: status,
        });
    }

    async function startRecording() {
        try {
            const newAudioStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });

            const _recorder = new RecordRTC(newAudioStream, { type: 'audio' });

            setRecorder(_recorder);
            updateRecordingStatus(true);
        } catch (error) {
            console.log({ error });

            updateRecordingStatus(false);
        }
    }

    function stopRecording() {
        recorder.stopRecording(function (url) {
            let blob = recorder.getBlob();

            setRecordedAudioBlob(blob);
            setRecordedAudioURL(url);
            updateRecordingStatus(false);

            updateRecordStage('before-send');
        });
    }

    function togglePlayPauseAudio() {
        if (audioRef.current.paused) {
            setIsPlayingPreview(true);
            audioRef.current.play();
        } else {
            audioRef.current.pause();
            setIsPlayingPreview(false);
        }
    }

    const { recordStage, isRecording, permissionDenied } = state;

    if (recordStage === 'permission') {
        return (
            <RecorderWrap className='wpwax-vm-record-staging'>
                <h4 className='wpwax-video-screen-title'>
                    To record audio, your browser will need to request access to
                    your camera & microphone.
                </h4>
                <img src={permissionImg} alt='wpwax video support' />
                <a
                    href='#'
                    className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                    onClick={() => requestPermission()}
                >
                    Request Permission
                </a>

                {permissionDenied && (
                    <div className='wpwax-vm-mt-10 wpwax-vm-alert wpwax-vm-alert-danger'>
                        Please grant the requested permission
                    </div>
                )}
            </RecorderWrap>
        );
    } else if (recordStage === 'record') {
        return (
            <RecorderWrap className='wpwax-vm-record-staging'>
                <span
                    className={
                        isRecording
                            ? 'wpwax-vm-timer wpwax-vm-timer-start'
                            : 'wpwax-vm-timer'
                    }
                >
                    <span className='wpwax-vm-sec'>00</span>
                    <span className='wpwax-vm-seperator'>:</span>
                    <span className='wpwax-vm-min'>00</span>
                </span>
                <div className='wpwax-vm-record-staging__bottom'>
                    {!isRecording ? (
                        <p>
                            Tap to{' '}
                            <span className='wpwax-vm-highlighted'>Start</span>{' '}
                            recording!
                        </p>
                    ) : (
                        ''
                    )}
                    <div
                        className={
                            !isRecording
                                ? 'wpwax-vm-record-staging__bottom--action'
                                : 'wpwax-vm-record-staging__bottom--action wpwax-vm-record-start'
                        }
                    >
                        <a
                            href='#'
                            className='wpwax-vm-record-btn'
                            onClick={() => startRecording()}
                        ></a>
                        <a
                            href='#'
                            className='wpwax-vm-pause-btn'
                            onClick={() => stopRecording()}
                        ></a>
                        <a href='#' className='wpwax-vm-btn-close'>
                            x
                        </a>
                    </div>
                </div>
            </RecorderWrap>
        );
    } else if (recordStage === 'before-send') {
        return (
            <RecorderWrap>
                <div className=''>
                    <audio
                        ref={audioRef}
                        src={recordedAudioURL}
                        onPlay={() => setIsPlayingPreview(true)}
                        onPause={() => setIsPlayingPreview(false)}
                        onEnded={() => setIsPlayingPreview(false)}
                    ></audio>
                </div>

                <div className='wpwax-vm-record-ready__top'>
                    <div
                        className='wpwax-vm-recorded-preview wpax-vm-preview-bg'
                        style={{ backgroundImage: `url("${previewBg}")` }}
                    ></div>
                    <a
                        href='#'
                        onClick={togglePlayPauseAudio}
                        className='wpwax-vm-recorded-play'
                    >
                        <ReactSVG src={isPlayingPreview ? play : pause} />
                    </a>
                </div>
                <div className='wpwax-vm-record-ready__bottom'>
                    <h4>Ready to Send ?</h4>
                    <div className='wpwax-vm-record-ready__bottom--actions'>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                        >
                            Yes
                        </a>
                        <a
                            href='#'
                            className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-light'
                        >
                            No
                        </a>
                    </div>
                </div>
            </RecorderWrap>
        );
    } else if (recordStage === 'progress') {
    } else if (recordStage === 'success') {
    }
};

export default Record;
