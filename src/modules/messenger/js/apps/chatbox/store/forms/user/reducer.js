import actions from "./actions";

const {
    UPDATING_FORM_DATA,
    UPDATE_FORM_DATA,
    UPDATED_FORM_DATA,
    SUBMIT_FORM_BEGAIN,
    SUBMIT_FORM_SUCCESS, 
    SUBMIT_FORM_ERROR, 
} = actions;

const initialState = {
    formData: {
        email: '',
        name: '',
    },
    user: null,
	isUpdatingFormData: false,
	isReadyFormData: false,
	isSubmitting: false,
	status: null,
};

const reducer = ( state = initialState, action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case UPDATING_FORM_DATA:
            return {
                ...state,
                isUpdatingFormData: true,
            };
        case UPDATE_FORM_DATA:
            const _isReadyFormData = ( typeof payload.isFinalUpdate === 'boolean' ) ? payload.isFinalUpdate : state.isReadyFormData;

            console.log( 'UPDATE_FORM_DATA', { _isReadyFormData } );

            return {
                ...state,
                formData: { ...state.formData, ...payload.formData },
                isReadyFormData: _isReadyFormData,
            };
        case UPDATED_FORM_DATA:
            return {
                ...state,
                isUpdatingFormData: false,
            };
        case SUBMIT_FORM_BEGAIN:
            return {
                ...state,
                isSubmitting: true
            };
        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                user: action.payload.data,
                isSubmitting: false,
                status: true,
            };
        case SUBMIT_FORM_ERROR:
            return {
                ...state,
                isSubmitting: false,
                status: false,
            };
        default:
            return state;
    }
};

export default reducer;