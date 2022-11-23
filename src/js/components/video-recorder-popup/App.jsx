import { useEffect, useState } from 'react';

import Container from './Style';

import useVideoRecorder from 'Hooks/media-recorder/useVideoRecorder';
import useCountdown from 'Hooks/useCountdown';

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
		isRecording,
		recordedBlob,
		recordedURL,
		hasPermission,
		requestPermission,
		setupStream,
		videoStreemRef,
		startRecording,
		stopRecording,
		getCountDown,
		reset: resetRecorder,
	} = useVideoRecorder();

	// States
	const [ currentStage, setCurrentStage ] = useState( stages.RECORD );
	const [ hasRecordingPermission, setHasRecordingPermission ] = useState( false );
	const [ isSaving, setIsSaving ] = useState( false );

	// On Avtivation
	useEffect( () => {

		setCurrentStage( stages.RECORD );
		setupRecordingPermission();

	}, [] );

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

	// handleRecordButtonAction
    async function handleRecordButtonAction( event ) {
        event.preventDefault();

        if ( isRecording ) {
            stopRecording();
            setCurrentStage( stages.SUBMIT );
            return;
        }

		await startCountdown();

		startRecording();
    };

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

	// Handle Close
	function handleClose( event ) {
		event.preventDefault();
		resetRecorder();

		if ( typeof onClose === 'function' ) {
			onClose();
		}
	}

	if ( ! hasRecordingPermission ) {
		return '';
	}

	if ( currentStage === stages.RECORD ) {
        return (
			<div className="helpgent-modal-wrap">
				<Container
					className={
						! isRecording
							? 'wpwax-vm-reply-pause'
							: 'wpwax-vm-reply-start'
					}
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
								{isRecording ? (
									<span className='wpwax-vm-timer'>
										{' '}
										{getCountDown()}
									</span>
								) : (
									''
								)}
							</h4>
							{isRecording || (
								<a
									href=''
									className='wpwax-vm-reply-close'
									onClick={handleClose}
								>
									<span className='dashicons dashicons-no-alt'></span>
								</a>
							)}
						</div>
					) }

					{ ! isActiveCountdown && (
						<div className='wpwax-vm-reply-bottom'>
							<a
								href=''
								className='wpwax-vm-btn-record'
								onClick={handleRecordButtonAction}
							></a>
						</div>
					)}

				</Container>
			</div>

        );
    } else {
        return (
			<div className="helpgent-modal-wrap">
				<Container className='wpwax-vm-reply-ready'>
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