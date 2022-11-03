import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../store/chatbox/actionCreator';
import screenTypes from '../../../store/chatbox/screenTypes';

import {
	upateState as updateUserState
} from '../../../store/forms/user/actionCreator';

import {
    updateFormData as updateMessengerFormData,
    submitForm as submitMessengerForm,
    upateState as upateMessengerFormState,
} from '../../../store/forms/messenger/actionCreator';

import useChatboxController from '../hooks/useChatboxController';

import useConversationAPI from 'API/useConversationAPI';
import useMessangerAPI from 'API/useMessangerAPI';
import useUserAPI from 'API/useUserAPI';
import useGuestUserAPI from 'API/useGuestUserAPI';


function Sending() {
    const dispatch = useDispatch();

	// Hooks
	const {
		needToGoContactPage,
		isLoggedIn,
		isUserAdmin,
		isUserClient,
		userRoleIncludes,
		enabledGuestSubmission,
		getCollectInfoFields,
	} = useChatboxController();

	// API
	const { createItem: createUser, updateItem: updateUser, userExists } = useUserAPI();
	const { createItem: createGuestUser } = useGuestUserAPI();
	const { createItem: createConversation } = useConversationAPI();
	const { createItem: createMessage } = useMessangerAPI();

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

	const email = ( userForm.user && userForm.user.email ) ? userForm.user.email : '';

	// Local States
	const [ currentStage, setCurrentStage ] = useState( stages.SENDING );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ userEmail, setUserEmail ] = useState( '' );

	const [ callbacks, setCallbacks ] = useState( { onRetry: submitMessage } );

    // @Init
    useEffect(() => {
		// const _isLoggedIn             = isLoggedIn();
		// const _isUserAdmin            = isUserAdmin();
		// const _isUserClient           = isUserClient();
		// const _enabledGuestSubmission = enabledGuestSubmission();
		// const _needToGoContactPage    = needToGoContactPage();
		// const _getCollectInfoFields   = getCollectInfoFields();


		// console.log({
		// 	_isLoggedIn,
		// 	_isUserAdmin,
		// 	_isUserClient,
		// 	_enabledGuestSubmission,
		// 	_needToGoContactPage,
		// });

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

		const userID = createUserResponse.data.email;

		// Add user ID to message
		dispatch(
			updateMessengerFormData({
				user_id: userID,
			})
		);

		setUserEmail( userID );

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
		submitMessage();
	}

	/**
	 * Handle New User
	 *
	 * # If guest login is enabled
	 *   - Register user as guest
	 *     - If user exist -> Swith to Autentication Page
	 *   - Send The Message
	 * # If guest login not enabled
	 *   - Register user as WP user
	 *     - If user exist -> Swith to Autentication Page
	 *     - Send The Message
	 */
	async function handleNewUser() {
		// Handle Existing User
		const email = ( userForm.formData.email ) ? userForm.formData.email : '';
		const userExistsResponse = await userExists( email );

		if ( ! userExistsResponse.success ) {
			dispatch(
				updateUserState({
					status: null,
					statusMessage: ( userExistsResponse.message ) ? userExistsResponse.message : 'Something went wrong, please try again.',
				})
			);

			dispatch( changeChatScreen( screenTypes.CONTACT_FORM ) );
			return;
		}

		if ( userExistsResponse.data ) {
			const isGuest = userExistsResponse.data.is_guest;

			if ( isGuest ) {
				dispatch(
					updateUserState({
						status: false,
						statusMessage: 'You are already registered as guest, please continue from the link provided to your email for further communication.',
					})
				);

				dispatch( changeChatScreen( screenTypes.CONTACT_FORM ) );
				return;
			}

			dispatch( changeChatScreen( screenTypes.USER_AUTHENTICATION_FORM ) );
			return;
		}

		// Register The User
		const userResponse = await registerUser();

		if ( ! userResponse.success ) {
			dispatch( changeChatScreen( screenTypes.CONTACT_FORM ) );
			return;
		}

		setUserEmail( userResponse.data.email );
		submitMessage( userResponse.data.email );
	}

	/**
	 * Update Current User
	 */
	async function updateCurrentUser() {
		// Assign Client Role To User
		// Update User Meta
	}

	/**
	 * Register User
	 *
	 */
	async function registerUser() {
		dispatch(
			updateUserState({
				status: null,
				statusMessage: '',
			})
		);

		let response = { success: false };

		// If guest login is enabled
		if ( enabledGuestSubmission() ) {
			// Register user as guest
			response = await registerGuestUser();
		} else {
			// Register user as WP user
			response = await registerWPUser();
		}

		if ( ! response.success ) {
			dispatch(
				updateUserState({
					status: false,
					statusMessage: ( response.message ) ? response.message : 'Something went wrong, please try again.',
				})
			);
		}

		return response;
	}

	/**
	 * Register WP User
	 *
	 */
	async function registerWPUser() {

	}

	/**
	 * Register Guest User
	 */
	async function registerGuestUser() {
		const args = userForm.formData;
		return await createGuestUser( args );
	}

	// Submit Message
	async function submitMessage( _userEmail ) {
		// Reset States
		setErrorMessage( '' );

		const formData = {
			...messengerForm.formData,
			user_email: ( _userEmail ) ? _userEmail : userEmail
		};

		// Create Message
		const response = await createTheMessage( formData );

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


	// createTheMessage
	async function createTheMessage( args ) {
		let status = { success: false, message: '', data: null };


		const email = ( args.user_email ) ? args.user_email : '';
		const conversation = await createConversation( { created_by: email } );

		if ( ! conversation.success ) {

		}

		console.log( { conversation, email } );



		try  {

			const email = ( args.user_email ) ? args.user_email : '';
			const conversation = await createConversation( { created_by: email } );

			console.log( { conversation, email } );


			status.success = false;
			status.message = 'Debugging';

			return status;

			args.conversation_id = conversation.data.id;

			const response = await createMessage( args );

			status.success = true;
			status.data = response.data;
			status.message = 'The message has been created successfuly';

			return status;

		} catch ( error ) {
			status.success = false;
			status.message = '---';
			// status.message = ( error.response.data && error.response.data.message ) ? error.response.data.message : error.message;

			console.error( error );

			return status;
		}
	}

	// Show Error Page
	function showErrorPage( onRetry ) {
		setCurrentStage( stages.ERROR );

		if ( typeof onRetry === 'function' ) {
			setCallbacks({ ...callbacks, onRetry  });
		}
	}

	// Retry
	function retry( event ) {
		event.preventDefault();
		// setCurrentStage( stages.SENDING );

		if ( typeof callbacks.onRetry === 'function' ) {
			callbacks.onRetry();
		}
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
