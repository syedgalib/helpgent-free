import { ReactSVG } from "react-svg";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { changeChatScreen } from "../../../../store/chatbox/actionCreator";
import { upateFormData } from "../../../../store/forms/user/actionCreator";
import paperPlan from "Assets/svg/icons/paper-plane.svg";
import { useState } from "react";
import screenTypes from "../../../../store/chatbox/screenTypes";

function Form() {
    const dispatch = useDispatch();

	const nameRef  = useRef();
	const emailRef = useRef();

    const [ errorMessage, setErrorMessage ] = useState( '' );

	function submitHandler(e) {
		e.preventDefault();

		const name  = nameRef.current.value;
		const email = emailRef.current.value;

        if ( ! name || ! email ) {
            setErrorMessage( 'Please fill up the required fields' );
            return;
        }

        const formData = { name, email };

        dispatch( upateFormData( formData ) );
        dispatch( changeChatScreen( screenTypes.SENDING ) );

        setTimeout( function() {
            dispatch( changeChatScreen( screenTypes.SUCCESS ) );
        }, 3000 )
	}

    return (
        <form onSubmit={submitHandler} className="wpwax-vm-h-100pr">
            <div className="wpwax-vm-h-100pr wpwax-vm-d-flex wpwax-vm-flex-direction-column">
				<div className="wpwax-vm-body wpwax-vm-flex-grow-1">
                    <h4 className="wpwax-vm-contact-form__title">Before you go, please leave your contact details so we can get back to you…</h4>
                    
                    <div className="wpwax-vm-form-group">
                        <input ref={nameRef} type="text" className="wpwax-vm-form__element" placeholder="Your name*"/>
					</div>

                    <div className="wpwax-vm-form-group">
                        <input ref={emailRef} type="text" className="wpwax-vm-form__element" placeholder="Your email*" />
                    </div>
				</div>

				<div className="wpwax-vm-footer">
                    <button type="submit" className="wpwax-vm-btn wpwax-vm-w-f wpwax-vm-btn-block wpwax-vm-btn-lg wpwax-vm-btn-primary">
						Submit <ReactSVG src={ paperPlan } />
					</button>

                    { errorMessage && 
                    <div className="wpwax-vm-alert wpwax-vm-alert-danger">
                        { errorMessage }
                    </div>
                    }
				</div>
			</div>
        </form>
    );
}

export default Form;