import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../store/chatbox/actionCreator';
import screenTypes from '../../../store/chatbox/screenTypes';


import {
	upateState as updateUserState
} from '../../../store/forms/user/actionCreator';


import useChatboxController from '../hooks/useChatboxController';

import useConversationAPI from 'API/useConversationAPI';
import useMessangerAPI from 'API/useMessangerAPI';
import useUserAPI from 'API/useUserAPI';
import useGuestUserAPI from 'API/useGuestUserAPI';
import { useRef } from 'react';

function Sending() {
    const dispatch = useDispatch();

	// Hooks
	const {
		currentUser,
		isUserLoggedIn,
		enabledGuestSubmission,
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

	// Local States
	const [ currentStage, setCurrentStage ] = useState( stages.SENDING );
	const [ errorMessage, setErrorMessage ] = useState( '' );

	const userEmailRef = useRef();

	const [ callbacks, setCallbacks ] = useState( { onRetry: submitMessage } );

    // @Init
    useEffect(() => {
		init();
    }, []);

	/**
	 * Init
	 *
	 * @returns {void}
	 */
	async function init() {
		if ( isUserLoggedIn() ) {
			handleOldUser();
			return;
		}

		handleNewUser();
	}

	/**
	 * Handle New User
	 *
	 * @returns {void}
	 */
	async function handleNewUser() {
		// Handle Existing User
		const userExistsStatus = await checkIfUserExists();

		if ( userExistsStatus.status ) {

			if ( typeof userExistsStatus.callback === 'function' ) {
				userExistsStatus.callback();
			}

			return;
		}

		// Register The User
		const userResponse = await registerUser();
		if ( ! userResponse.success ) {
			dispatch( changeChatScreen( screenTypes.CONTACT_FORM ) );
			return;
		}

		submitMessage( userResponse.data.email );
	}

	/**
	 * Handle Old User
	 *
	 * @returns {void}
	 */
	async function handleOldUser( args ) {

		const defaultArgs = { user: null };

		args = ( args && typeof args === 'object' ) ? { ...defaultArgs, ...args } : defaultArgs;

		let currentUserEmail = ( currentUser && currentUser.email ) ? currentUser.email : '';

		if ( args.user && args.user.email ) {
			currentUserEmail = args.user.email;
		}

		submitMessage( currentUserEmail );
	}

	/**
	 * Check If User Exists
	 *
	 * @returns {bool}
	 */
	async function checkIfUserExists() {

		let status = { status: false, callback: null };

		const email = ( userForm.formData.email ) ? userForm.formData.email : '';
		const userExistsResponse = await userExists( email );

		if ( ! userExistsResponse.success ) {
			const callback = () => {
				dispatch(
					updateUserState({
						status: null,
						statusMessage: ( userExistsResponse.message ) ? userExistsResponse.message : 'Something went wrong, please try again.',
					})
				);

				dispatch( changeChatScreen( screenTypes.CONTACT_FORM ) );
			};

			status.status = true;
			status.callback = callback;

			return status;
		}

		if ( ! userExistsResponse.data ) {
			status.status = false;
			return status;
		}

		const isGuest = userExistsResponse.data.is_guest;

		if ( isGuest ) {
			const callback = () => {
				dispatch(
					updateUserState({
						user: userExistsResponse.data,
					})
				);

				handleOldUser( { user: userExistsResponse.data } );
			};

			status.status = true;
			status.data = userExistsResponse.data;
			status.callback = callback;

			return status;
		}

		const callback = () => {
			dispatch(
				updateUserState({
					user: userExistsResponse.data,
				})
			);

			dispatch( changeChatScreen( screenTypes.USER_AUTHENTICATION_FORM ) );
		};

		status.status = true;
		status.callback = callback;

		return status;
	}

	/**
	 * Update Current User
	 *
	 * @returns {object}
	 */
	async function updateCurrentUser() {
		let args = JSON.parse( JSON.stringify( userForm.formData ) );
		return await updateUser( currentUser.id, args );
	}

	/**
	 * Register User
	 *
	 * @returns {object}
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
	 * @returns {object}
	 */
	async function registerWPUser() {
		const args = userForm.formData;
		return await createUser( args );
	}

	/**
	 * Register Guest User
	 *
	 * @returns {object}
	 */
	async function registerGuestUser() {
		const args = userForm.formData;
		return await createGuestUser( args );
	}

	/**
	 * Submit Message
	 *
	 * @param {string} _userEmail
	 * @returns {void}
	 */
	async function submitMessage( _userEmail ) {

		// Reset States
		setErrorMessage( '' );

		const formData = {
			...messengerForm.formData,
			user_email: ( _userEmail ) ? _userEmail : userEmailRef.current
		};

		userEmailRef.current = formData.user_email;

		// Create Message
		const response = await createTheConversation( formData );

		// Switch to Retry Stage if failed
		if ( ! response.success ) {
			const message = ( response.message ) ? response.message : 'Something went wrong, please try again';
			navigateToErrorStage( message, submitMessage );
			return;
		}

		// Navigate to Success Screen
		setTimeout(() => {
            dispatch( changeChatScreen( screenTypes.SUCCESS ) );
        }, 2000);
	}


	/**
	 * Create The Conversation
	 *
	 * @param {object} args
	 * @returns {object}
	 */
	async function createTheConversation( args ) {
		let conversationArgs = {
			created_by: ( args.user_email ) ? args.user_email : '',
		};

		if ( messengerForm.add_terms ) {
			conversationArgs.add_terms = messengerForm.add_terms;
		}

		let apiConfig = {};

		if ( userForm.token ) {
			apiConfig = {
				headers: {
					'Helpgent-Token': userForm.token
				}
			};
		}

		const conversationResponse = await createConversation( conversationArgs, apiConfig );

		if ( ! conversationResponse.success ) {
			return conversationResponse;
		}

		args.conversation_id = conversationResponse.data.id;

		const messageResponse = await createMessage( args, apiConfig );

		if ( ! messageResponse.success ) {
			return messageResponse;
		}

		return messageResponse;
	}

	/**
	 * Navigate To Error Stage
	 *
	 * @param {string} message
	 * @param {function} onRetry
	 * @returns {void}
	 */
	function navigateToErrorStage( message, onRetry ) {
		if ( typeof message === 'string' ) {
			setErrorMessage( message );
		}

		if ( typeof onRetry === 'function' ) {
			setCallbacks( { onRetry: onRetry } );
		}

		setCurrentStage( stages.ERROR );
	}


	/**
	 * Retry
	 *
	 * @param {object} event
	 * @returns {void}
	 */
	function retry( event ) {
		event.preventDefault();

		setCurrentStage( stages.SENDING );

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
