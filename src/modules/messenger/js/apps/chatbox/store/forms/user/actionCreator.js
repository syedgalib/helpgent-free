import actions from "./actions";
import api from './api';

const { 
    upatingFormData, 
    upateFormDataAction, 
    upatedFormData, 
    submitFormBegain, 
    submitFormSuccess, 
    submitFormError,
} = actions;

const upateFormData = ( formData, isFinalUpdate ) => {
    return async (dispatch) => {
        dispatch( upatingFormData() );
        dispatch( upateFormDataAction( formData, isFinalUpdate ) );
        dispatch( upatedFormData() );
    }
}

const submitForm = ( formData ) => {
    return async (dispatch) => {
 
        console.log( { formData } );

        try {
            dispatch( submitFormBegain() );

            let response = await api.createUser( formData );
            let result   = response.data;

            console.log( { result } );

            dispatch( submitFormSuccess( result ) );
        } catch (error) {
            console.log( { error } );
            dispatch( submitFormError( error ) );
        }
    }
};

export { upateFormData, submitForm };