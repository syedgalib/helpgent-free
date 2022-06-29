import actions from "./actions";
import defaultTemplateData from '././../data/defaultChatboxTemplate';

const { 
    LOAD_TEMPLATE_BEGAIN, 
    LOAD_TEMPLATE_SUCCESS, 
    LOAD_TEMPLATE_ERROR, 
} = actions;

const initialState = {
	isLoading: false,
	showChatbox: false,
	template: defaultTemplateData,
    supportedReplayTypes: [
        { type: 'text', label: 'Text' },
        { type: 'video', label: 'Video' },
        { type: 'voice', label: 'Voice' },
        { type: 'screenRecord', label: 'Screen Record' },
    ]
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case LOAD_TEMPLATE_BEGAIN:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_TEMPLATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                showChatbox: true,
                template: action.payload.data[0],
            };
        case LOAD_TEMPLATE_ERROR:
            return {
                ...state,
                isLoading: false,
                showChatbox: false,
            };
        default:
            return state;
    }
};

export default reducer;