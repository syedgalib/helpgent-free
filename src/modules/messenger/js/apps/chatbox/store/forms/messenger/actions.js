const actions = {
    UPDATE_FORM_DATA: 'UPDATE_MESSENGER_FORM_DATA',
    SUBMIT_FORM_BEGAIN: 'SUBMIT_MESSENGER_FORM_BEGAIN',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_MESSENGER_FORM_SUCCESS',
    SUBMIT_FORM_ERROR: 'SUBMIT_MESSENGER_FORM_ERROR',

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
};

export default actions;