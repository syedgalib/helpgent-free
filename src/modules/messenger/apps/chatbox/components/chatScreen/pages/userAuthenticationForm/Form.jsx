// import { ReactSVG } from 'react-svg';
import ReactSVG from 'react-inlinesvg';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../../store/chatbox/actionCreator';

import {
	upateState as updateUserState
} from './../../../../store/forms/user/actionCreator';

import paperPlan from 'Assets/svg/icons/paper-plane.svg';
import loadingIcon from 'Assets/svg/loaders/loading-spin.svg';

import { useState } from 'react';
import screenTypes from '../../../../store/chatbox/screenTypes';
import http from 'Helper/http';

function Form() {
    const dispatch = useDispatch();

    const { userForm } = useSelector((state) => {
        return {
            userForm: state.userForm,
        };
    });

    const passwordRef = useRef();

    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // submitHandler
    async function submitHandler(e) {
        e.preventDefault();

		if ( isLoading ) {
			return;
		}

		// Reset States
		setErrorMessage('');

        const email = userForm.user.email;
        const password = passwordRef.current.value;

        if ( ! password ) {
            setErrorMessage('Please fill up the required fields');
            return;
        }

        const formData = { email, password };

		setIsLoading( true );

		const response = await authenticate( formData );

		if ( ! response.success ) {
			setErrorMessage( response.message );
			setIsLoading( false );
			return;
		}

		dispatch(
			updateUserState({
				is_varified: true,
			})
		);

        dispatch(
			changeChatScreen( screenTypes.SENDING )
		);
    }

	// authenticate
	async function authenticate( args ) {
		let status = { success: false, message: '', data: null };

		try  {
			const response = await http.postData( "/users/authenticate", args );

			status.success = true;
			status.data = response;
			status.message = 'Authenticated successfuly';

			return status;

		} catch ( error ) {
			status.success = false;
			status.message = ( error.response.data && error.response.data.message ) ? error.response.data.message : error.message;

			return status;
		}
	}

	const loadingIconStyle = {
		width: '50px',
		height: '50px',
		display: 'inline-flex',
		justifyContent: 'center',
		alignItems: 'center',
	}

    return (
        <form onSubmit={submitHandler} className='wpwax-vm-h-100pr'>
            <div className='wpwax-vm-chatbox-contact wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column wpwax-vm-justify-content-center'>
                <div className='wpwax-vm-body'>
                    <h4 className='wpwax-vm-contact-form__title'>
                        You already have an account, please enter your password to continue
                    </h4>

                    <div className='wpwax-vm-form-group'>
                        <input
							min='1'
                            ref={passwordRef}
                            type='password'
                            className='wpwax-vm-form__element'
                            placeholder='Password*'
                        />
                    </div>
                </div>

                <div className='wpwax-vm-footer'>
                    <button
                        type='submit'
						disabled={isLoading}
                        className='wpwax-vm-btn wpwax-vm-w-f wpwax-vm-btn-block wpwax-vm-btn-lg wpwax-vm-btn-primary'
                    >
                        Continue
						{ isLoading ?
							<span style={loadingIconStyle}><ReactSVG src={loadingIcon} /></span> :
							<ReactSVG src={paperPlan} /> }
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
