import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../store/chatbox/actionCreator';
import screenTypes from '../../../store/chatbox/screenTypes';
import http from 'Helper/http';

import useConversationAPI from "API/useConversationAPI";
import useMessangerAPI from "API/useMessangerAPI";

import {
	upateState as updateUserState
} from '../../../store/forms/user/actionCreator';

import {
    updateFormData as updateMessengerFormData,
    submitForm as submitMessengerForm,
    upateState as upateMessengerFormState,
} from '../../../store/forms/messenger/actionCreator';

function Sending() {
    const dispatch = useDispatch();

	const { createItem: createConversationItem } = useConversationAPI();
	const { createItem: createMessangerItem } = useMessangerAPI()

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
	const [ userID, setUserID ] = useState( messengerForm.formData.user_id );

    // @Init
    useEffect(() => {
		init();
    }, []);

	async function init() {
		// Situations
		// @ User is logged in
		//   # User is not client
		//   # User is client

		// @ User is not logged in
		//   # Guest Login Enabled
		//   # Guest Login Not Enabled


		// Submit the messgage if message has user ID
		// --------------------------------
		if ( messengerForm.formData.user_id && userForm.is_varified ) {
			submitMessage();
			return;
		}

		// Create or get the user
		// --------------------------------
		const createUserResponse = await createUser( userForm.formData );
		if ( ! createUserResponse.success ) {
			dispatch(
				updateUserState({
					status: false,
					statusMessage: createUserResponse.message,
				})
			);

			// Return to Contact Form Page if failed
			setTimeout(() => {
				dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
			}, 2000);

			return;
		}

		const userID = createUserResponse.data.id;

		// Add user ID to message
		dispatch(
			updateMessengerFormData({
				user_id: userID,
			})
		);

		setUserID( userID );

		// Verify user if exists
		// --------------------------------
		if ( ! createUserResponse.data.is_new_user ) {
			dispatch(
				updateUserState({
					user: createUserResponse.data,
					needAuthentication: true,
					is_varified: false,
				})
			);

			dispatch(changeChatScreen(screenTypes.USER_AUTHENTICATION_FORM));
			return;
		}

		// Submit Message
		// --------------------------------
		submitMessage( userID );
	}


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

		dispatch(
			updateUserState({
				status: null,
				statusMessage: '',
			})
		);

		try  {
			const response = await http.postData( "/users", args );

			status.success = true;
			status.data = response.data;
			status.message = 'The user has been created successfuly';

			dispatch(
				updateUserState({
					status: true,
					statusMessage: status.message,
				})
			);

			return status;

		} catch ( error ) {
			status.success = false;
			status.message = ( error.response.data && error.response.data.message ) ? error.response.data.message : error.message;

			return status;
		}

	}

	// createMessage
	async function createMessage( args ) {
		let status = { success: false, message: '', data: null };

		try  {
			const conversation = await createConversationItem();
			args.conversation_id = conversation.data.id;

			const response = await createMessangerItem( args );

			status.success = true;
			status.data = response.data;
			status.message = 'The message has been created successfuly';

			return status;

		} catch ( error ) {
			status.success = false;
			status.message = ( error.response.data && error.response.data.message ) ? error.response.data.message : error.message;

			console.error( error );

			return status;
		}
	}

	// Retry
	function retry( event ) {
		event.preventDefault();
		setCurrentStage( stages.SENDING );
		submitMessage();
	}


	if ( currentStage === stages.SENDING ) {
		return (
			<div className='wpwax-vm-record-send-progress wpwax-vm-p-25 wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
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
