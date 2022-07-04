const actions = {
    UPDATING_FORM_DATA: 'UPDATING_USER_FORM_DATA',
    UPDATE_FORM_DATA: 'UPDATE_USER_FORM_DATA',
    UPDATED_FORM_DATA: 'UPDATED_USER_FORM_DATA',
    SUBMIT_FORM_BEGAIN: 'SUBMIT_USER_FORM_BEGAIN',
    SUBMIT_FORM_SUCCESS: 'SUBMIT_USER_FORM_SUCCESS',
    SUBMIT_FORM_ERROR: 'SUBMIT_USER_FORM_ERROR',

    upatingFormData: () => {
        return {
            type: actions.UPDATING_FORM_DATA,
        }
    },
    upateFormDataAction: ( formData, isFinalUpdate ) => {
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
};

export default actions;