import actions from "./actions";

const { 
    UPDATE_FORM_DATA,
    SUBMIT_FORM_BEGAIN,
    SUBMIT_FORM_SUCCESS, 
    SUBMIT_FORM_ERROR, 
} = actions;

const initialState = {
    formData: {
        email: '',
        name: '',
    },
	isSubmitting: false,
	status: null,
};

const reducer = ( state = initialState, action ) => {
    const { payload } = action;

    switch ( action.type ) {
        case UPDATE_FORM_DATA:
            return {
                ...state,
                formData: { ...state.formData, ...payload }
            };
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