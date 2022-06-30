import actions from "./actions";

const { 
    SUBMIT_FORM_BEGAIN, 
    SUBMIT_FORM_SUCCESS, 
    SUBMIT_FORM_ERROR, 
} = actions;

const initialState = {
    formData: {
        user_id: 0,
    },
	isSubmitting: false,
	status: null,
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case SUBMIT_FORM_BEGAIN:
            return {
                ...state,
                isSubmitting: true
            };
        case SUBMIT_FORM_SUCCESS:
            return {
                ...state,
                isSubmitting: false,
                status: action.payload.data,
            };
        case SUBMIT_FORM_ERROR:
            return {
                ...state,
                isSubmitting: false,
                status: action.payload.data,
            };
        default:
            return state;
    }
};

export default reducer;