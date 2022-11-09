import React, { useEffect, useState } from 'react';
import ReactSVG from 'react-inlinesvg';
import { showToggler, updateScreenTogglerContent } from "../../../../store/chatbox/actionCreator";
import minimizeIcon from 'Assets/svg/icons/window-minimize.svg';
import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import ScreenRecordWrap from './Style.js';
import { useDispatch, useSelector } from "react-redux";
import useScreenRecorder from 'Hooks/media-recorder/useScreenRecorder';
import permissionImg from 'Assets/img/chatbox/permission.png';

import { updateFormData as updateMessengerFormData } from './../../../../store/forms/messenger/actionCreator';
import screenTypes from '../../../../store/chatbox/screenTypes';
import messageTypes from './../../../../store/forms/messenger/messageTypes';
import { changeChatScreen } from '../../../../store/chatbox/actionCreator';

import useAttachmentAPI from "API/useAttachmentAPI";
import useChatboxController from '../../hooks/useChatboxController';
import useCountdown from 'Hooks/useCountdown';

function ScreenRecord() {
	const dispatch = useDispatch();

	// Store States
    const { settings } = useSelector((state) => {
        return {
            settings: state.settings.options,
        };
    });

	// Hooks
	const {
		needToGoContactPage
	} = useChatboxController();

	const {
		isActiveCountdown,
		startCountdown,
		CountdownPage,
		getReverseCount,
	} = useCountdown();

	const { createItem: createAttachmentItem } = useAttachmentAPI();

	const afterStopRecording = () => {
		setState({
			...state,
			recordStage: "beforeSend"
		});
	};

	const {
		hasPermission,
		requestPermission,
		permissionDenied,
		recordedScreenBlob,
		recordedScreenURL,
		setupStream,
		startRecording,
		stopRecording,
		recordedTimeInSecond,
		getCountDown,
		reset,
	} = useScreenRecorder({
		maxRecordLength: getMaxRecordLength(),
		afterStopRecording,
	});

	const [state, setState] = useState({
		recordStage: "request_permission"
    });

	// @Init State
	useEffect( () => {
		initSetup();
	}, [] );

	useEffect( () => {
		dispatch( updateScreenTogglerContent( getCountDown() ) )
	}, [ recordedTimeInSecond ] );

	async function initSetup() {
		const _hasPermission = await hasPermission();

		if ( _hasPermission ) {
			setState({
				...state,
				recordStage: "startScreen"
			});

			return;
		}

	}

	function getMaxRecordLength() {

		if ( settings && typeof settings.maxVideoLength !== 'undefined' && ! isNaN( settings.maxVideoLength ) ) {
			return parseInt( settings.maxVideoLength ) * 60;
		}

		return 0;
	}

	async function handleRequestPermission( event ) {
		event.preventDefault();

		const grantedPermission = await requestPermission();

		if ( grantedPermission ) {
			setState({
				...state,
				recordStage: "startScreen"
			});
		}
	}

	const handleMinizeScreen = ()=>{
		dispatch(showToggler());
	}

	const handleSelectScreen = async event => {
		event.preventDefault();

		if(state.recordStage === "startScreen"){

			const _recorder = await setupStream();

			if ( ! _recorder ) {
				return;
			}

			// Start Countdown
			await startCountdown();

			startRecording( _recorder );
			handleMinizeScreen();

			setState({
				...state,
				recordStage: "stopScreen"
			});
		} else {
			stopRecording();
		}
	}

	const handleUpload = async event => {
		event.preventDefault();

		if ( ! recordedScreenBlob ) {
			return;
		}

		upload();
	}

	const upload = async () => {
		setState({
			...state,
			recordStage: "uploading"
		});

		const response = await createAttachmentItem( { file: recordedScreenBlob } );

		if ( ! response.success ) {
			setState({
				...state,
				recordStage: "upload_failed"
			});

			return;
		}

		// Update Messenger Form Data
		dispatch(
			updateMessengerFormData({
				message_type: messageTypes.VIDEO,
				attachment_id: response.data.id,
			})
		);

		if ( needToGoContactPage() ) {
			dispatch( changeChatScreen( screenTypes.CONTACT_FORM) );
			return;
		}

		dispatch( changeChatScreen( screenTypes.SENDING ) );
	}

	const tryUploadAgain = event => {
		event.preventDefault();
		upload();
	}

	const goBack = event => {
		event.preventDefault();

		reset();

		setState({
			...state,
			recordStage: "startScreen"
		});
	}

	if(state.recordStage === "request_permission"){
		return (
			<ScreenRecordWrap className="wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-record-permission">

				<h4 className='wpwax-video-screen-title'>
                    To record video, your browser will need to request access to
                    your camera & microphone.
                </h4>
                <img src={permissionImg} alt='wpwax video support' />

				<br />

                <a
                    href='#'
                    className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                    onClick={handleRequestPermission}
                >
                    Request Permission
                </a>

                {permissionDenied !== null && permissionDenied && (
                    <div className='wpwax-vm-mt-10 wpwax-vm-alert wpwax-vm-alert-danger'>
                        Please grant the requested permission
                    </div>
                )}

			</ScreenRecordWrap>
		)
	}

	if(state.recordStage === "startScreen" || state.recordStage === "stopScreen"){
		return (
			<ScreenRecordWrap className="wpwax-vm-p-20 wpwax-vm-h-100pr wpwax-vm-chat-screen">

				<div className="wpwax-hg-screenrecord-box">
					<div className="wpwax-hg-screenrecord-top">
						<span className="wpwax-hg-record-timer">{ getCountDown() }</span>
						<a href="#" className="wpwax-hg-btn-minimize" onClick={handleMinizeScreen}>
							<ReactSVG src={minimizeIcon} />
						</a>
					</div>
					<div className="wpwax-hg-screenrecord-action">
						<a href="#" className="wpwax-vm-btn wpwax-vm-btn-block wpwax-vm-btn-primary" onClick={e=>handleSelectScreen(e)}>
							{
								state.recordStage === "startScreen" ? "Select Screen" : "Stop Recording"
							}
						</a>
					</div>
				</div>

				{ isActiveCountdown && ( <div className="wpwax-vm-countdown-wrap"><CountdownPage count={getReverseCount()}/></div> ) }

			</ScreenRecordWrap>
		);
	}

	else if(state.recordStage === "beforeSend"){
		return(
			<ScreenRecordWrap className='wpwax-vm-record-ready'>
				<form action='#' className='wpwax-vm-form'>
					<div className='wpwax-vm-recored-video'>
						<div className='wpwax-vm-recorded-preview wpax-vm-preview-bg'>
							<video controls src={recordedScreenURL}></video>
						</div>
					</div>
					<div className='wpwax-vm-form-bottom'>
						<p>Ready to send?</p>
						<a
							href='#'
							onClick={handleUpload}
							className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary wpwax-vm-mb-10'
						>
							Send
							<ReactSVG src={paperPlan} />
						</a>
						<a
							href='#'
							onClick={(e) => goBack(e)}
							className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-light'
						>
							Cancel
						</a>
					</div>
				</form>
			</ScreenRecordWrap>
		)

	}

	else if(state.recordStage === "uploading"){
		return(
			<ScreenRecordWrap className='wpwax-vm-record-send-progress'>
				<div className='wpwax-vm-record-send-progress__content wpwax-vm-text-center'>
                    <div className='wpwax-vm-record-send-progress__bar'>
                        <span>Uploading</span>
                    </div>
                    <h4>We’re currently uploading your file.</h4>
                    <p className='wpwax-vm-danger-text wpwax-vm-danger-text'>
                        Please don’t leave this page!
                    </p>
                </div>
			</ScreenRecordWrap>
		)
	}

	else if(state.recordStage === "upload_failed"){
		return(
			<ScreenRecordWrap className='wpwax-vm-record-ready'>
				<div>
                    <p className='wpwax-vm-danger-text wpwax-vm-mb-20 wpwax-vm-danger-text wpwax-vm-text-center'>
                        Couldn't upload the file, please try again.
                    </p>
                    <a
                        href='#'
                        onClick={tryUploadAgain}
                        className='wpwax-vm-btn wpwax-vm-btn-lg wpwax-vm-btn-block wpwax-vm-btn-primary'
                    >
                        Try Again
                    </a>
                </div>
			</ScreenRecordWrap>
		)

	}

	else {
		return '';
	}


}

export default ScreenRecord;
