import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeChatScreen } from '../../../store/chatbox/actionCreator';
import screenTypes from '../../../store/chatbox/screenTypes';

import { submitForm as submitUserForm } from './../../../store/forms/user/actionCreator';

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

    // Init State
    useEffect(() => {
        if (userForm.submitted) {
            return;
        }

        if (userForm.isSubmitting) {
            return;
        }

        if (!userForm.isReadyFormData) {
            return;
        }

        dispatch(submitUserForm(userForm.formData));
    }, [userForm.isReadyFormData]);

    // After Submission
    useEffect(() => {
        if (messengerForm.submited) {
            return;
        }

        if (userForm.isSubmitting) {
            return;
        }

        if (userForm.status === null) {
            return;
        }

        if (userForm.status === false) {
            dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
            return;
        }

        // Add user ID to message
        dispatch(
            updateMessengerFormData({
                user_id: userForm.user.id,
            })
        );

        dispatch(upateMessengerFormState({ initSubmission: true }));
    }, [userForm.status]);

    // Init Message Submission
    useEffect(() => {
        if (messengerForm.submited) {
            return;
        }

        if (!messengerForm.initSubmission) {
            return;
        }

        dispatch(submitMessengerForm(messengerForm.formData));
    }, [messengerForm.initSubmission]);

    // After Message Submission
    useEffect(() => {
        if (messengerForm.isSubmitting) {
            return;
        }

        if (messengerForm.status === null) {
            return;
        }

        if (messengerForm.status === false) {
            dispatch(changeChatScreen(screenTypes.CONTACT_FORM));
            return;
        }

        dispatch(changeChatScreen(screenTypes.SUCCESS));
    }, [messengerForm.status]);

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
}

export default Sending;
