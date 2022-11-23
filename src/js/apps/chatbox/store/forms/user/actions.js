const actions = {
    UPDATE_STATE: 'UPDATE_USER_FORM_STATE',
    UPDATING_FORM_DATA: 'UPDATING_USER_FORM_DATA',
    UPDATE_FORM_DATA: 'UPDATE_USER_FORM_DATA',
    UPDATED_FORM_DATA: 'UPDATED_USER_FORM_DATA',
    SUBMIT_FORM_BEGAIN: 'SUBMIT_USER_FORM_BEGAIN',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_USER_FORM_SUCCESS',
    SUBMIT_FORM_ERROR: 'SUBMIT_USER_FORM_ERROR',
    RESET: 'RESET_USER',

    upateState: ( data ) => {
        return {
            type: actions.UPDATE_STATE,
            payload: data,
        }
    },
    upatingFormData: () => {
        return {
            type: actions.UPDATING_FORM_DATA,
        }
    },
    updateFormDataAction: ( formData, isFinalUpdate ) => {
        return {
            type: actions.UPDATE_FORM_DATA,
            payload: { formData, isFinalUpdate },
        }
    },
    upatedFormData: () => {
        return {
            type: actions.UPDATED_FORM_DATA,
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