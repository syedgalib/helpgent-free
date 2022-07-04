import actions from "./actions";
import api from './api';

const { 
    upateFormData, 
    submitFormBegain, 
    submitFormSuccess, 
    submitFormError,
} = actions;

const submitForm = ( formData ) => {
    return async dispatch => {
        try {
            dispatch( submitFormBegain() );

            let response = await api.sendMessage( formData );
            let result   = response.data;

            dispatch( submitFormSuccess( result ) );
        } catch (error) {
            dispatch( submitFormError( error ) );
        }
    }
};

export { upateFormData, submitForm };