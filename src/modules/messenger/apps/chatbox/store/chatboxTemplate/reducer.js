import actions from "./actions";
import defaultTemplateData from './defaultChatboxTemplate';
import screenTypes from "../chatbox/screenTypes";

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
        { type: screenTypes.TEXT, label: 'Text' },
        { type: screenTypes.VIDEO, label: 'Video' },
        { type: screenTypes.AUDIO, label: 'Voice' },
        { type: screenTypes.SCREEN_RECORD, label: 'Screen Record' },
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
			const showChatbox = action.payload.data.length;

            return {
                ...state,
                isLoading: false,
                showChatbox: showChatbox,
                template: showChatbox ? action.payload.data[0] : null,
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