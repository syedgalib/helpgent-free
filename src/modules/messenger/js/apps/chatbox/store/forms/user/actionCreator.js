import actions from "./actions";
import api from '../../../helpers/api';

const { 
    submitFormBegain, 
    submitFormSuccess, 
    submitFormError,
} = actions;

const submitForm = ( formData ) => {
    return async dispatch => {
        try {
            dispatch( submitFormBegain() );

            let response = await api.createUser( formData );
            let result   = response.data;

            dispatch( submitFormSuccess( result ) );
        } catch (error) {
            dispatch( submitFormError( error ) );
        }
    }
};

export { submitForm as loadTemplate };