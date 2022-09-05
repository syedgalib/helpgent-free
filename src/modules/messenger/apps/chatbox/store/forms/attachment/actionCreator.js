import actions from "./actions";
import api from './api';

const {
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

            let response = await api.createAttachment( formData );
            let result   = response.data;

            dispatch( submitFormSuccess( result.data ) );
        } catch (error) {
            console.log( { error: error.response.data } );
            dispatch( submitFormError( error.response.data ) );
        }
    }
};

export { updateFormData, submitForm, reset };