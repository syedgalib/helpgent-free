import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../store/chatbox/actionCreator';
import screenTypes from '../../../store/chatbox/screenTypes';
import http from 'Helper/http';

import {
	submitForm as submitUserForm,
	upateState as upateUserFormState
} from './../../../store/forms/user/actionCreator';

import {
    updateFormData as updateMessengerFormData,
    submitForm as submitMessengerForm,
    upateState as upateMessengerFormState,
} from './../../../store/forms/messenger/actionCreator';

function Sending() {
    const dispatch = useDispatch();

    // Store States
    const { userForm, messengerForm } = useSelector((state) => {
        return {
            userForm: state.userForm,
            messengerForm: state.messengerForm,
        };
    });

	const stages = {
		SENDING: 'SENDING',
		ERROR: 'ERROR',
	};

	// Local States
	const [ currentStage, setCurrentStage ] = useState( stages.SENDING );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ userID, setUserID ] = useState( 0 );

    // Init State
    useEffect(() => {
		// If message has user ID
		// --------------------------------
		if ( messengerForm.formData.user_id ) {
			// Submit Message
			submitMessage();
			return;
		}

		// If message has no user ID
		// --------------------------------
		// Create User
		createUser( userForm.formData )
			.then( response => {

				console.log( 'chk-1', { response } );

				const userID = response.data.id;

				// Add user ID to message
				dispatch(
					updateMessengerFormData({
						user_id: userID,
					})
				);

				setUserID( userID );

				// Submit Message
				submitMessage( userID );
			})
			.catch( error => {
				console.log( 'chk-2', { error } );

				dispatch(
					upateUserFormState({
						statusMessage: error.message,
					})
				);

				// Return to Contact Form Page if failed
				setTimeout(() => {
					dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
				}, 2000);
			});

    }, []);


	// Submit Message
	async function submitMessage( argUserID ) {
		// Reset States
		setErrorMessage( '' );

		const formData = {
			...messengerForm.formData,
			user_id: ( argUserID ) ? argUserID : userID
		};

		// Create Message
		const response = await createMessage( formData );

		console.log( 'chk-3', { response } );

		// Switch to Retry Stage if failed
		if ( ! response.success ) {
			setErrorMessage( response.message );
			setCurrentStage( stages.ERROR );
			return;
		}

		// Navigate to Success Screen
		setTimeout(() => {
            dispatch( changeChatScreen( screenTypes.SUCCESS ) );
        }, 2000);
	}

	// createUser
	async function createUser( args ) {
		let status = { success: false, message: '', data: null };

		console.log( 'createUser', args );

		try  {
			const response = await http.postData( "/users", args );

			status.success = true;
			status.data = response.data;
			status.message = 'The user has been created successfuly';

			return status;

		} catch ( error ) {
			status.success = false;
			status.message = response.message;

			return status;
		}

	}

	// createMessage
	async function createMessage( args ) {
		let status = { success: false, message: '', data: null };

		console.log( 'createMessage', args );

		try  {
			const response = await http.postData( "/messages", args );

			status.success = true;
			status.data = response.data;
			status.message = 'The message has been created successfuly';

			return status;

		} catch ( error ) {
			status.success = false;
			status.message = response.message;

			return status;
		}
	}

	// Retry
	function retry( event ) {
		event.preventDefault();
		setCurrentStage( stages.SENDING );
		submitMessage();
	}


    // // Init State
    // useEffect(() => {
    //     if (userForm.submitted) {
    //         return;
    //     }

    //     if (userForm.isSubmitting) {
    //         return;
    //     }

    //     if (!userForm.isReadyFormData) {
    //         return;
    //     }

    //     dispatch(submitUserForm(userForm.formData));
    // }, [userForm.isReadyFormData]);

    // // After Submission
    // useEffect(() => {
    //     if (messengerForm.submited) {
    //         return;
    //     }

    //     if (userForm.isSubmitting) {
    //         return;
    //     }

    //     if (userForm.status === null) {
    //         return;
    //     }

    //     if (userForm.status === false) {
    //         setTimeout(() => {
    //             dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
    //         }, "2000");
    //         return;
    //     }

    //     // Add user ID to message
    //     dispatch(
    //         updateMessengerFormData({
    //             user_id: userForm.user.id,
    //         })
    //     );

    //     dispatch(upateMessengerFormState({ initSubmission: true }));
    // }, [userForm.status]);

    // // Init Message Submission
    // useEffect(() => {
    //     if (messengerForm.submited) {
    //         return;
    //     }

    //     if (!messengerForm.initSubmission) {
    //         return;
    //     }

    //     dispatch(submitMessengerForm(messengerForm.formData));
    // }, [messengerForm.initSubmission]);

    // // After Message Submission
    // useEffect(() => {
    //     if (messengerForm.isSubmitting) {
    //         return;
    //     }

    //     if (messengerForm.status === null) {
    //         return;
    //     }

    //     if (messengerForm.status === false) {
    //         setTimeout(() => {
    //             dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
    //         }, "2000");
    //         return;
    //     }
    //     setTimeout(() => {
    //         dispatch(changeChatScreen(screenTypes.SUCCESS));
    //     }, "2000");

    // }, [messengerForm.status]);


	if ( currentStage === stages.SENDING ) {
		return (
			<div className='wpwax-vm-record-send-progress wpwax-vm-p-25 wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
				<div className='wpwax-vm-record-send-progress__content'>
					<div className='wpwax-vm-record-send-progress__bar'>
						<span>Sending</span>
					</div>

					<div className='wpwax-vm-text-center'>
						<h4>We’re currently processing your request</h4>
						<p className='wpwax-vm-danger-text wpwax-vm-text-danger'>
							Please don’t leave this page!
						</p>
					</div>
				</div>
			</div>
		);
	} else if ( currentStage === stages.ERROR ) {
		return (
			<div className='wpwax-vm-record-send-progress wpwax-vm-p-25 wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
				<div className='wpwax-vm-record-send-progress__content'>
					<div className='wpwax-vm-text-center'>
						<h4>{errorMessage}</h4>
						<a href="#" onClick={retry}>Retry</a>
					</div>
				</div>
			</div>
		);
	} else {
		return '';
	}


}

export default Sending;
