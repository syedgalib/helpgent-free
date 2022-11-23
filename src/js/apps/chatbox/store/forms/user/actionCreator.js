import actions from "./actions";
import api from './api';

const {
    upateState,
    upatingFormData,
    updateFormDataAction,
    upatedFormData,
    submitFormBegain,
    submitFormSuccess,
    submitFormError,
    reset,
} = actions;

const updateFormData = ( formData, isFinalUpdate ) => {
    return async (dispatch) => {
        dispatch( upatingFormData() );
        dispatch( updateFormDataAction( formData, isFinalUpdate ) );
        dispatch( upatedFormData() );
    }
}

const submitForm = ( formData ) => {
    return async (dispatch) => {
        try {
            dispatch( submitFormBegain() );

            let response = await api.createUser( formData );
            let result   = response.data;

            dispatch( submitFormSuccess( result ) );
        } catch (error) {
            dispatch( submitFormError( error.response.data.message ) );

			console.log( { error } );
        }
    }
};

export { upateState, updateFormData, submitForm, reset };