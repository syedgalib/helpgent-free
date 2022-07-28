import actions from "./actions";
import api from './api';

const { 
    submitFormBegain, 
    submitFormSuccess, 
    submitFormError,
} = actions;

const submitForm = ( formData ) => {
    return async dispatch => {
        try {
            dispatch( submitFormBegain() );

            let response = await api.createAttachment( formData );
            let result   = response.data;

            dispatch( submitFormSuccess( result ) );
        } catch (error) {
            console.log( { error: error.response.data } );
            dispatch( submitFormError( error.response.data ) );
        }
    }
};

export { submitForm as loadTemplate };