import actions from "./actions";
import defaultTemplateData from './defaultChatboxTemplate';
import screenTypes from "../chatbox/screenTypes";

const {
    LOAD_TEMPLATE_BEGAIN,
    LOAD_TEMPLATE_SUCCESS,
    LOAD_TEMPLATE_ERROR,
} = actions;

const preparePrimaryButtonStyle = ( options ) => {
    return {
        color: options['primary_button_font_color'],
        backgroundColor: options['primary_button_background_color'],
        borderRadius: options['button_border_radius'],
        border: 'hidden',
        fontFamily: options['font_family'],
        fontSize: options['font_size'],
    }
}

const prepareChatTitleStyle = ( options ) => {
    return {
        color: options['chat_options_title_font_color'],
        fontFamily: options['font_family'],
        fontSize: options['chat_options_title_font_size'],
    }
}

const prepareGreetMessageStyle = ( options ) => {
    return {
        color: options['greet_message_font_color'],
        fontFamily: options['font_family'],
        fontSize: options['greet_message_font_size'],
    }
}

const initialState = {
	isLoading: false,
	showChatbox: false,
	template: defaultTemplateData,
    supportedReplayTypes: [
        { type: screenTypes.TEXT, label: 'Text' },
        { type: screenTypes.VIDEO, label: 'Video' },
        { type: screenTypes.AUDIO, label: 'Voice' },
        { type: screenTypes.SCREEN_RECORD, label: 'Screen Record' },
    ],
    primaryButton: {
        color: '#FFFFFF',
        backgroundColor: '#FFFFFF',
        radius: '10',
        fontFamily: 'roboto',
        fontSize: 'medium',
    },
    chatTitle: {
        fontFamily: 'roboto',
        fontSize: 'medium',
        color: '#FFFFFF',
    },
    greetMessage: {
        fontFamily: 'roboto',
        fontSize: 'medium',
        color: '#FFFFFF',
    },
    primaryColor: '#2271b1',
    pageBackgroundColor: '#ffffff',

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
            console.log( action.payload.data );
            const options = action.payload.data[0]['options'];
            return {
                ...state,
                isLoading: false,
                showChatbox: showChatbox,
                template: showChatbox ? action.payload.data[0] : null,
                templateStyles: {
                    primaryButtonStyle: preparePrimaryButtonStyle( options ),
                    chatTitleStyle: prepareChatTitleStyle( options ),
                    greetMessageStyle: prepareGreetMessageStyle( options ),
                    primaryColor: options['primary_color'],
                    pageBackgroundColor: options['page_background_color'],
                }
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