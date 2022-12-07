import { useEffect, useState, useRef } from 'react';
import ReactSVG from 'react-inlinesvg'
import Container from './Style';

import useVideoRecorder from 'Hooks/media-recorder/useVideoRecorder';
import useCountdown from 'Hooks/useCountdown';

import play from 'Assets/svg/icons/play.svg';
import pause from 'Assets/svg/icons/pause-solid.svg';
import crossSmall from 'Assets/svg/icons/cross-small.svg';

function App( { onSelect, onSave, onClose } ) {
	const stages = {
        SUBMIT: 'submit',
        RECORD: 'record',
    };

	// Hooks
	const {
		isActiveCountdown,
		startCountdown,
		CountdownPage,
		getReverseCount,
	} = useCountdown();

	const {
		isVideoRecording,
		isRecordingPaused,
		recordedTimeInSecond,
		recordedBlob,
		recordedURL,
		hasPermission,
		requestPermission,
		setupStream,
		videoStreemRef,
		startRecording,
		pauseRecording,
		resumeRecording,
		stopRecording,
		getCountDown,
		reset: resetRecorder,
	} = useVideoRecorder();

	const videoToggleRef = useRef(null);

	// States
	const [ currentStage, setCurrentStage ] = useState( stages.RECORD );
	const [ hasRecordingPermission, setHasRecordingPermission ] = useState( false );
	const [ videoRecorderStatus, setVideoRecorderStatus ] = useState( null );
	const [ isSaving, setIsSaving ] = useState( false );

	// On Avtivation
	useEffect( () => {

		setCurrentStage( stages.RECORD );
		setupRecordingPermission();

	}, [] );

	/* Focus Input field when search inopen */
    useEffect(() => {
        
        const checkIfClickedOutside = e => {
            
            if (videoToggleRef.current && !videoToggleRef.current.contains(e.target)) {
                if(videoRecorderStatus === null){
					
                    resetRecorder();
					console.log(typeof onClose === 'function')
					if ( typeof onClose === 'function' ) {
						console.log(videoRecorderStatus)
						onClose();
					}
                }
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [videoRecorderStatus]);

	// setupRecordingPermission
	async function setupRecordingPermission() {

		if ( await hasPermission() ) {
			setHasRecordingPermission( true );
			setupStream();
			return;
		}

		const grantedPermission = await requestPermission();

		if ( grantedPermission ) {
			setHasRecordingPermission( true );
			setupStream();
		}
	}

	// onSubmit
	async function onSubmit( event ) {
		event.preventDefault();

		let data = null;

		if ( typeof onSave === 'function' ) {
			setIsSaving( true );

			const saveResponse = await onSave( { file: recordedBlob } );

			setIsSaving( false );

			if ( ! saveResponse.success ) {
				const message = ( saveResponse.message ) ? saveResponse.message : 'Something went wrong.';

				alert( message );
				return;
			}

			data = saveResponse.data;
		}

		if ( typeof onSelect === 'function' ) {
			onSelect( data );
		}

		if ( typeof onClose === 'function' ) {
			onClose();
		}
	}

	/* Handle Start Recording */
	async function handleStartRecording( e ) {
		e.preventDefault();
        setVideoRecorderStatus('recording');
		await startCountdown();
		startRecording();
	}

	/* Handle Pause Recording */
    async function handlePauseRecording( e ) {
		e.preventDefault();
		if ( isVideoRecording ) {
            setVideoRecorderStatus('paused');
			pauseRecording();
		}
	}

	/* Handle Resume Recording */
    async function handleResumeRecording( e ) {
		e.preventDefault();
        resumeRecording();
	}

	/* Handle Send Recording */
    async function handleSendRecording( e ) {
		e.preventDefault();
        stopRecording();
        setCurrentStage( stages.SUBMIT );
	}

	// Handle Close
	function handleClose( event ) {
		event.preventDefault();
		resetRecorder();

		if ( typeof onClose === 'function' ) {
			onClose();
		}
		setVideoRecorderStatus(null);
	}

	const getRightBtnContent = () => {
        if (isRecordingPaused || isVideoRecording) {
            return (
                <a
                    href='#'
                    className={isRecordingPaused ? 'wpwax-vm-btn-record-right wpwax-vm-btn-play' : 'wpwax-vm-btn-record-right wpwax-vm-btn-pause'}
                    onClick={ isRecordingPaused ?  (e) => handleResumeRecording(e) : (e) => handlePauseRecording(e)}

                > {isRecordingPaused ? null : <ReactSVG src={pause} />} </a>
            );
        } else if (isVideoRecording && recordedTimeInSecond === 0) {
            return null;
        }
    };

	if ( ! hasRecordingPermission ) {
		return '';
	}

	if ( currentStage === stages.RECORD ) {
        return (
			<div className="helpgent-modal-wrap">
				<Container
					className={
						isVideoRecording || isRecordingPaused
							? 'wpwax-vm-reply-start'
							: null
					}
					ref={videoToggleRef}
				>

					{ isActiveCountdown && ( <div className="wpwax-vm-reply-countdown"><CountdownPage count={ getReverseCount() } /></div> ) }

					<div
						className='wpwax-vm-reply-video-bg'
						style={{ backgroundColor: '#000000' }}
					>
						<video
							ref={videoStreemRef}
							width='100%'
							height='100%'
							muted
						></video>
					</div>

					{ ! isActiveCountdown && (
						<div className='wpwax-vm-reply-top'>
							<h4>
								<span className='wpwax-vm-timer'>
									{getCountDown()}
								</span>
							</h4>
							{isVideoRecording || (
								<a
									href=''
									className='wpwax-vm-reply-close'
									onClick={handleClose}
								>
									<ReactSVG src={crossSmall} />
								</a>
							)}
						</div>
					) }

					{ ! isActiveCountdown && (
						<div className='wpwax-vm-reply-bottom'>
							{
								isVideoRecording || isRecordingPaused ? 
								<a
									href='#'
									className='wpwax-vm-btn-record'
									onClick={ handleSendRecording }
								></a>
								: 
								<a
									href='#'
									className='wpwax-vm-btn-record'
									onClick={ handleStartRecording }
								></a>
							}
							
							{
								getRightBtnContent()
							}
							
						</div>
					)}

				</Container>
			</div>

        );
    } else {
        return (
			<div className="helpgent-modal-wrap">
				<Container className='wpwax-vm-reply-ready' ref={videoToggleRef}>
					<a
						href=''
						className='wpwax-vm-reply-close'
						onClick={handleClose}
					>
						<span className='dashicons dashicons-no-alt'></span>
					</a>

					<div className='wpwax-vm-reply-ready__video'>
						<div className='wpwax-vm-reply-video-bg'>
							<video
								controls
								src={recordedURL}
								width='100%'
								height='100%'
							></video>
						</div>
						<div className="wpwax-vm-reply-video-footer">
							<div className='wpwax-vm-reply-ready__text-form--action'>
								<a href='#' className='wpwax-vm-reply-ready-btn wpwax-vm-btn-back' onClick={handleClose}>
									<span className='dashicons dashicons-arrow-left-alt'></span>
									<span className='wpwax-vm-reply-ready-btn__text'>
										Cancel
									</span>
								</a>

								<a onClick={onSubmit} href='#' className='wpwax-vm-reply-ready-btn wpwax-vm-btn-send'>
									<span className='wpwax-vm-reply-ready-btn__text'>
										{ ! isSaving ? 'Save' : 'Saving...'}
									</span>
									<span className='dashicons dashicons-arrow-right-alt'></span>
								</a>
							</div>
						</div>
					</div>
				</Container>
			</div>

        );
    }
}

export default App;