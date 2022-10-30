import actions from "./actions";
import defaultTemplateData from './defaultChatboxTemplate';
import replayTypes from "../chatbox/replayTypes";

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

function loadTemplateStyle( options ) {

    const chatBoxDom = document.querySelector('#wpwax-vm-chatbox');
    chatBoxDom.style.setProperty("--color-page-bg", options.page_background_color);
    chatBoxDom.style.setProperty("--color-page-header-bg", options.page_header_background_color);
    chatBoxDom.style.setProperty("--color-text-greet", options.greet_message_font_color);
    chatBoxDom.style.setProperty("--font-size-greet", options.greet_message_font_size+'em');
    chatBoxDom.style.setProperty("--play-button-bg", options.play_btn_background);
    chatBoxDom.style.setProperty("--color-text-chat", options.chat_options_title_font_color);
    chatBoxDom.style.setProperty("--font-size-chat", options.chat_options_title_font_size+'em');
    chatBoxDom.style.setProperty("--font-family", options.font_family);
    chatBoxDom.style.setProperty("--btn-radius", options.button_border_radius + 'px');
    chatBoxDom.style.setProperty("--primary-button-color", options.primary_button_font_color);
    chatBoxDom.style.setProperty("--primary-button-bg", options.primary_button_background_color);
    chatBoxDom.style.setProperty("--color-footer-text", options.footer_message_color);
    chatBoxDom.style.setProperty("--footer-text-font-size", options.footer_message_font_size+'em');
    chatBoxDom.style.setProperty("--color-thank-page-bg", options.thank_page_background_color);
    chatBoxDom.style.setProperty("--color-thank-title", options.thank_page_title_color);
    chatBoxDom.style.setProperty("--font-size-thank-title", options.thank_page_title_font_size+'em');
    chatBoxDom.style.setProperty("--color-thank-desc", options.thank_page_description_color);
    chatBoxDom.style.setProperty("--font-size-thank-desc", options.thank_page_description_font_size+'em');
}

const initialState = {
	isLoading: false,
	showChatbox: false,
	template: defaultTemplateData,
    supportedReplayTypes: [
        { type: replayTypes.TEXT, label: 'Text' },
        { type: replayTypes.AUDIO, label: 'Voice' },
        { type: replayTypes.VIDEO, label: 'Video' },
        { type: replayTypes.SCREEN_RECORDING, label: 'Screen Recording' },
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

			const form = ( action.payload.length ) ? action.payload[0] : null;
            const options = ( form ) ? form['options'] : {};

			if ( form ) {
				loadTemplateStyle( options );
			}

            return {
                ...state,
                isLoading: false,
                showChatbox: form ? true : false,
                template: form,
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