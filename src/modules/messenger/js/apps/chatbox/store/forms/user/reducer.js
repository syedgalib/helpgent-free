import actions from "./actions";

const {
    UPDATE_STATE,
    UPDATING_FORM_DATA,
    UPDATE_FORM_DATA,
    UPDATED_FORM_DATA,
    SUBMIT_FORM_BEGAIN,
    SUBMIT_FORM_SUCCESS, 
    SUBMIT_FORM_ERROR,
    RESET,
} = actions;

const initialState = {
    formData: {
        name: '',
        email: '',
    },
    user: null,
	isUpdatingFormData: false,
	isReadyFormData: false,
	submitted: false,
	isSubmitting: false,
	status: null,
	statusMessage: '',
};

const reducer = ( state = initialState, action ) => {
    const { type, payload } = action;

    switch ( type ) {
        case UPDATE_STATE:
            return {
                ...state,
                ...payload,
            };
        case UPDATING_FORM_DATA:
            return {
                ...state,
                isUpdatingFormData: true,
            };
        case UPDATE_FORM_DATA:
            const _isReadyFormData = ( typeof payload.isFinalUpdate === 'boolean' ) ? payload.isFinalUpdate : state.isReadyFormData;
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
                submitted: true,
                isSubmitting: true,
                status: null,
            };
        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                user: payload,
                isSubmitting: false,
                status: true,
            };
        case SUBMIT_FORM_ERROR:
            return {
                ...state,
                isSubmitting: false,
                status: false,
                statusMessage: payload,
            };

        case RESET:
            return initialState;

        default:
            return state;
    }
};

export default reducer;