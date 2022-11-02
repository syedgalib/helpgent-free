import actions from "./actions";

const {
    UPDATE_STATE,
    UPDATE_FORM_DATA,
    RESET,
    SUBMIT_FORM_BEGAIN,
    SUBMIT_FORM_SUCCESS,
    SUBMIT_FORM_ERROR,
} = actions;

const initialState = {
    formData: {
        user_email: '',
        message: '',
        message_type: 'text',
        attachment_id: 0,
        terms: '',
    },
	initSubmission: false,
	submited: false,
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
        case UPDATE_FORM_DATA:
            return {
                ...state,
                formData: { ...state.formData, ...payload }
            };
        case SUBMIT_FORM_BEGAIN:
            return {
                ...state,
                submited: true,
                isSubmitting: true,
                status: null,
            };
        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
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