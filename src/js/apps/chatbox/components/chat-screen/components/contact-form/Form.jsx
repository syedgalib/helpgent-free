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
import useChatboxController from '../../hooks/useChatboxController';

function Form() {
    const dispatch = useDispatch();

	const {
		isUserLoggedIn,
		enabledGuestSubmission,
		getCollectInfoFields
	} = useChatboxController();

    const { userForm, messengerForm } = useSelector((state) => {
        return {
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

	// @Init State
    useEffect(() => {
        if ( userForm.formData.name && nameRef.current ) {
            nameRef.current.value = userForm.formData.name;
        }

        if ( userForm.formData.email && emailRef.current) {
            emailRef.current.value = userForm.formData.email;
        }

        if ( userForm.formData.phone && phoneRef.current) {
            phoneRef.current.value = userForm.formData.phone;
        }

		if ( userForm.statusMessage ) {
            setErrorMessage( userForm.statusMessage );
        } else if ( messengerForm.statusMessage ) {
            setErrorMessage( messengerForm.statusMessage );
        }
    }, []);

	function showNameField() {
		return isUserLoggedIn() ? false : true;
	}

	function showEmailField() {
		return isUserLoggedIn() ? false : true;
	}

	function showPhoneField() {
		return getCollectInfoFields().includes( 'phone' );
	}

	function showPasswordField() {
		return ! isUserLoggedIn() && ! enabledGuestSubmission();
	}

    // submitHandler
    function submitHandler(e) {
        e.preventDefault();
        const formValidation = validateFormData();

		if ( ! formValidation.success ) {
			return;
		}

        dispatch( upateUserFormData( formValidation.data, true ) );
        dispatch( upateUserState( { submitted: false, status: null } ) );
        dispatch( changeChatScreen( screenTypes.SENDING ) );
    }

	function validateFormData() {
		let status = { success: false, data: null };

		// Reset Error Message
		setErrorMessage('');

		// Form Fields
		const formFields = [
			{
				label: 'Name',
				name: 'name',
				ref: nameRef,
				required: true,
			},
			{
				label: 'Email',
				name: 'email',
				ref: emailRef,
				required: true,
			},
			{
				label: 'Phone',
				name: 'phone',
				ref: phoneRef,
				required: true,
				minLength: 10,
			},
			{
				label: 'Password',
				name: 'password',
				ref: passwordRef,
				required: true,
				type: 'password',
				minLength: 5,
				matchWith: 'confirmPassword',
			},
			{
				label: 'Confirm Password',
				name: 'confirmPassword',
				ref: confirmPasswordRef,
				required: true,
				type: 'confirm_password',
			},
		];

		// Get Active Fields
		let activeFields = formFields.filter( field => field.ref.current );


		// Validate Form Data
		let errorMessages = [];

		for ( const field of activeFields ) {
			const fieldValue = field.ref.current.value;

			// Validate Required Field
			if ( typeof field.required !== 'undefined' && field.required && ! fieldValue.length ) {
				errorMessages.push( `${field.label} is required` );
			}

			// Validate Min Length
			if ( typeof field.minLength !== 'undefined' && fieldValue.length < field.minLength ) {
				errorMessages.push( `${field.label} must be at least ${field.minLength} character long` );
			}

			// Validate Match Field
			if ( typeof field.matchWith !== 'undefined' ) {
				const matchField = activeFields.filter( activeField => activeField.name === field.matchWith );

				if ( ! matchField.length ) {
					continue;
				}

				if ( matchField[0].ref.current.value !== fieldValue ) {
					errorMessages.push( `${field.label} do not match` );
				}
			}

		}

		if ( errorMessages.length ) {
			setErrorMessage( errorMessages[0] );
			return status;
		}

		// Filter Match Fields
		const matchFields = activeFields.filter( item => item.matchWith ).map( item => item.matchWith );
		activeFields = activeFields.filter( field => {
			return ! matchFields.includes( field.name );
		});

		let formData = {};

		for ( const field of activeFields ) {
			formData[ field.name ] = field.ref.current.value;
		}

		status.success = true;
		status.data = formData;

		return status;
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
