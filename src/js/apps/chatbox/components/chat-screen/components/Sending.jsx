import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../store/chatbox/actionCreator';
import screenTypes from '../../../store/chatbox/screenTypes';
import http from 'Helper/http';

import {
	upateState as updateUserState
} from '../../../store/forms/user/actionCreator';

import {
    updateFormData as updateMessengerFormData,
} from '../../../store/forms/messenger/actionCreator';

import useConversationAPI from '../../../../../helpers/hooks/api/useConversationAPI';
import useMessangerAPI from '../../../../../helpers/hooks/api/useMessangerAPI';
import useChatboxController from '../hooks/useChatboxController';

function Sending() {
    const dispatch = useDispatch();

	const {
		isLoggedIn,
		isUserAdmin,
		isUserClient,
		enabledGuestSubmission,
	} = useChatboxController();

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
	const [ userEmail, setUserEmail ] = useState( userForm.user.email );

    // @Init
    useEffect(() => {
		init();
    }, []);


	/**
	 * Init
	 *
	 * @ If user is logged in
	 *   # If user is client or admin
	 *     - Send The Message
	 *   # If user is not client or admin
	 *     - Update current user role and meta data
	 * 	   - Send The Message
	 *
	 * @ If user is not logged in
	 *   # If guest login is enabled
	 *     - Register user as guest
	 *        - If user exist -> Swith to Autentication Page
	 * 	   - Send The Message
	 *   # If guest login not enabled
	 *     - Register user as WP user
	 *       - If user exist -> Swith to Autentication Page
	 *     - Send The Message
	 */
	async function init() {
		// Handle Logged in User
		if ( isLoggedIn() ) {
			handleLoggedInUser();
			return;
		}

		// Handle New User
		handleNewUser();
	}


	/**
	 * Handle Logged In User
	 *
	 * # If user is client or admin
	 *   - Send The Message
	 * # If user is not client or admin
	 *   - Update current user role and meta data
	 * 	 - Send The Message
	 */
	async function handleLoggedInUser() {
		// If user is client or admin
		if ( isUserAdmin() || isUserClient() ) {
			submitMessage();
			return;
		}

		// Update Current User
		const updateCurrentUserResponse = await updateCurrentUser();

		if ( ! updateCurrentUserResponse.success ) {
			setCurrentStage( stages.ERROR );
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

		const userResponse = await registerUser();

		if ( ! userResponse.success ) {
			return;
		}

		submitMessage();
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
		// If guest login is enabled Register user as guest
		if ( enabledGuestSubmission() ) {
			return registerGuestUser();
		}

		// Register user as WP user
		return registerWPUser();
	}

	/**
	 * Register WP User
	 *
	 */
	function registerWPUser() {

	}

	/**
	 * Register Guest User
	 */
	function registerGuestUser() {

	}


	// Submit Message
	async function submitMessage( argUserEmail ) {
		// Reset States
		setErrorMessage( '' );

		const formData = {
			...messengerForm.formData,
			user_email: ( argUserEmail ) ? argUserEmail : userEmail
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
