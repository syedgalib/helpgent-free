import actions from "./actions";
import api from './api';

const {
    upateState,
    updateFormData,
    submitFormBegain,
    submitFormSuccess,
    submitFormError,
    reset,
} = actions;

const submitForm = ( formData ) => {
    return async dispatch => {
        try {
            dispatch( submitFormBegain() );

            let response = await api.sendMessage( formData );
            let result   = response.data;

            dispatch( submitFormSuccess( result ) );
        } catch (error) {
            dispatch( submitFormError( error.response.data.message ) );
        }
    }
};

export { upateState, updateFormData, submitForm, reset };