const actions = {
    SUBMIT_FORM_BEGAIN: 'SUBMIT_ATTACHMENT_FORM_BEGAIN',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_ATTACHMENT_FORM_SUCCESS',
    SUBMIT_FORM_ERROR: 'SUBMIT_ATTACHMENT_FORM_ERROR',

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