const actions = {
    UPDATE_FORM_DATA: 'UPDATE_ATTACHMENT_FORM_DATA',
    SUBMIT_FORM_BEGAIN: 'SUBMIT_ATTACHMENT_FORM_BEGAIN',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_ATTACHMENT_FORM_SUCCESS',
    SUBMIT_FORM_ERROR: 'SUBMIT_ATTACHMENT_FORM_ERROR',
    RESET: 'RESET_ATTACHMENT',

    updateFormData: ( formData ) => {
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