// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../../store/chatbox/actionCreator';
import {
    updateFormData as upateUserFormData,
    upateState as upateUserState,
} from '../../../../store/forms/user/actionCreator';

import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import { useState } from 'react';
import screenTypes from '../../../../store/chatbox/screenTypes';
import { useEffect } from 'react';
import { useCoreData } from 'Hooks/useCoreData.jsx';

function Form() {
    const dispatch = useDispatch();

    const { chatboxTemplateOptions, userForm, messengerForm } = useSelector((state) => {
        return {
			chatboxTemplateOptions: ( state.chatboxTemplate.template && state.chatboxTemplate.template.options ) ? state.chatboxTemplate.template.options : {},
            userForm: state.userForm,
            messengerForm: state.messengerForm,
        };
    });

    const nameRef            = useRef();
    const emailRef           = useRef();
    const phoneRef           = useRef();
    const passwordRef        = useRef();
    const confirmPasswordRef = useRef();

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (userForm.formData.name) {
            nameRef.current.value = userForm.formData.name;
        }

        if (userForm.formData.email) {
            emailRef.current.value = userForm.formData.email;
        }

		if ( userForm.statusMessage ) {
            setErrorMessage( userForm.statusMessage );
        } else if ( messengerForm.statusMessage ) {
            setErrorMessage( messengerForm.statusMessage );
        }
    }, []);


	function getCollectInfoFields() {
		return ( Array.isArray( chatboxTemplateOptions.collectInfo ) ) ? chatboxTemplateOptions.collectInfo : [];
	}

	function showNameField() {
		return isLoggedIn() ? false : true;
	}

	function showEmailField() {
		return isLoggedIn() ? false : true;
	}

	function showPhoneField() {
		return getCollectInfoFields().includes( 'phone' );
	}

	function showPasswordField() {
		return ! isLoggedIn() && ! isGuestLoginEnabled();
	}

	function isLoggedIn() {
		return useCoreData( 'current_user' );
	}

	function isGuestLoginEnabled() {
		return useCoreData( 'settings.guestSubmission' );
	}

    // submitHandler
    function submitHandler(e) {
        e.preventDefault();

		// Reset Error Message
		setErrorMessage('');

		// Form Fields
		const formFields = [
			{
				name: 'name',
				ref: nameRef,
				required: true,
			},
			{
				name: 'email',
				ref: emailRef,
				required: true,
			},
			{
				name: 'phone',
				ref: phoneRef,
				required: true,
			},
			{
				name: 'password',
				ref: passwordRef,
				required: true,
				type: 'password',
				minLength: 5,
			},
			{
				name: 'confirmPassword',
				ref: confirmPasswordRef,
				required: true,
				type: 'confirm_password',
			},
		];

		// Get Active Fields
		let activeFields = formFields.filter( field => field.ref.current );

		// Validate Reqired Data
		const missingReqiredData = activeFields.map( field => field.required && ! field.ref.current.value ? true : false ).includes( true );

        if ( missingReqiredData ) {
            setErrorMessage('Please fill up the required fields');
            return;
        }

		// Validate Password Field if Presents
		const passwordFields = activeFields.filter( field => [ 'password', 'confirm_password' ].includes( field.type ) );

		if ( passwordFields.length ) {
			const passwordField = passwordFields[0];
			const password      = passwordField.ref.current.value;

			// Validate password length
			if ( passwordField.minLength && password.length < passwordField.minLength ) {
				setErrorMessage( `Password must be at least ${passwordField.minLength} character long` );
            	return;
			}

			// Check if password match with confirm password
			const matchPassword = passwordFields.every( field => field.ref.current.value === password );
			if ( ! matchPassword ) {
				setErrorMessage('Password do not match');
            	return;
			}
		}

		activeFields = activeFields.filter( field => field.type !== 'confirm_password' );

        let formData = {};

		for ( const field of activeFields ) {
			formData[ field.name ] = field.ref.current.value;
		}

        dispatch( upateUserFormData( formData, true ) );
        dispatch( upateUserState( { submitted: false, status: null } ) );
        dispatch( changeChatScreen( screenTypes.SENDING ) );
    }

    return (
        <form onSubmit={submitHandler} className='wpwax-vm-h-100pr'>
            <div className='wpwax-vm-chatbox-contact wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
                <div className='wpwax-vm-body'>
                    <h4 className='wpwax-vm-contact-form__title'>
                        Before you go, please leave your contact details so we
                        can get back to you…
                    </h4>

                    { showNameField() && (
						<div className='wpwax-vm-form-group'>
							<input
								// required
								ref={nameRef}
								type='text'
								className='wpwax-vm-form__element'
								placeholder='Your name*'
							/>
						</div>
					)}

					{ showEmailField() && (
						<div className='wpwax-vm-form-group'>
							<input
								// required
								ref={emailRef}
								type='email'
								className='wpwax-vm-form__element'
								placeholder='Your email*'
							/>
						</div>
					)}


					{ showPhoneField() && (
						<div className='wpwax-vm-form-group'>
							<input
								// required
								ref={phoneRef}
								type='tel'
								className='wpwax-vm-form__element'
								placeholder='Your phone*'
							/>
						</div>
					)}

					{ showPasswordField() && (
						<>
							<div className='wpwax-vm-form-group'>
								<input
									// required
									ref={passwordRef}
									type='password'
									className='wpwax-vm-form__element'
									placeholder='Password*'
								/>
							</div>

							<div className='wpwax-vm-form-group'>
								<input
									// required
									ref={confirmPasswordRef}
									type='password'
									className='wpwax-vm-form__element'
									placeholder='Confirm Password*'
								/>
							</div>
						</>
					)}

                </div>

                <div className='wpwax-vm-footer'>
                    <button
                        type='submit'
                        className='wpwax-vm-btn wpwax-vm-w-f wpwax-vm-btn-block wpwax-vm-btn-lg wpwax-vm-btn-primary'
                    >
                        Submit <ReactSVG src={paperPlan} />
                    </button>

                    {errorMessage && (
                        <div className='wpwax-vm-mt-10 wpwax-vm-alert wpwax-vm-alert-danger'>
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
        </form>
    );
}

export default Form;
