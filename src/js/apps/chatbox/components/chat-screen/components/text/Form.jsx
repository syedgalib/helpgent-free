import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { updateFormData as updateMessengerFormData } from '../../../../store/forms/messenger/actionCreator';
import { changeChatScreen } from '../../../../store/chatbox/actionCreator';
import screenTypes from '../../../../store/chatbox/screenTypes';
import messageTypes from '../../../../store/forms/messenger/messageTypes';
import useChatboxController from '../../hooks/useChatboxController';

function Form() {
    const dispatch = useDispatch();
    const textRef = useRef();

	const { needToGoContactPage } = useChatboxController();

    function submitHandler(e) {
        e.preventDefault();

        const updatedFormData = {
            message_type: messageTypes.TEXT,
            message: textRef.current.value,
        };

        dispatch( updateMessengerFormData( updatedFormData ) );

		if ( needToGoContactPage() ) {
			dispatch( changeChatScreen( screenTypes.CONTACT_FORM) );
			return;
		}

		dispatch( changeChatScreen( screenTypes.CONTACT_FORM ) );
    }

    return (
        <form onSubmit={submitHandler}>
            <div className='wpwax-vm-chatbox-text-form-inner wpwax-vm-d-flex wpwax-vm-flex-direction-column'>
                <div className='wpwax-vm-form-group wpwax-vm-d-flex'>
                    <textarea
                        className='wpwax-vm-form__element wpwax-vm-transparent-form-control wpwax-vm-mb-20'
                        required
                        maxLength='1000'
                        row='10'
                        placeholder='Type your text...'
                        ref={textRef}
                    ></textarea>
                </div>

                <div className='wpwax-vm-footer'>
                    <button
                        type='submit'
                        className='wpwax-vm-btn wpwax-vm-w-f wpwax-vm-btn-block wpwax-vm-btn-lg wpwax-vm-btn-primary'
                    >
                        Next
                    </button>
                </div>
            </div>
        </form>
    );
}

export default Form;
