const actions = {
    UPDATE_STATE: 'UPDATE_MESSENGER_FORM_STATE',
    UPDATE_FORM_DATA: 'UPDATE_MESSENGER_FORM_DATA',
    SUBMIT_FORM_BEGAIN: 'SUBMIT_MESSENGER_FORM_BEGAIN',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_MESSENGER_FORM_SUCCESS',
    SUBMIT_FORM_ERROR: 'SUBMIT_MESSENGER_FORM_ERROR',
    RESET: 'RESET_MESSENGER',

    upateState: ( data ) => {
        return {
            type: actions.UPDATE_STATE,
            payload: data,
        }
    },
    upateFormData: ( formData ) => {
        return {
            type: actions.UPDATE_FORM_DATA,
            payload: formData,
        }
    },
    submitFormBegain: () => {
        return {
            type: actions.SUBMIT_FORM_BEGAIN,
        }
    },
    submitFormSuccess: ( response ) => {
        return {
            type: actions.SUBMIT_FORM_SUCCESS,
            payload: response,
        }
    },
    submitFormError: ( response ) => {
        return {
            type: actions.SUBMIT_FORM_ERROR,
            payload: response,
        }
    },
    reset: () => {
        return {
            type: actions.RESET,
        }
    },
};

export default actions;