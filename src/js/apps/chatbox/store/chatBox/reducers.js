import actions from './actions';
import screenTypes from './screenTypes';

const initialState = {
	showChatbox: false,
  	screenToggler: false,
  	screenTogglerContent: 'Open',
	currentChatScreen: screenTypes.SPLASH_SCREEN,
};

const {
  SHOW_CHATBOX,
  HIDE_CHATBOX,
  SHOW_TOGGLER,
  UPDATE_SCREEN_TOGGLER_CONTENT,
  HIDE_TOGGLER,
  CHANGE_CHAT_SCREEN,
} = actions;

const chatboxReducers = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SHOW_CHATBOX:
      return {
        ...state,
        showChatbox: true,
      };
    case HIDE_CHATBOX:
      return {
        ...state,
        currentChatScreen: screenTypes.HOME,
        showChatbox: false,
      };
    case SHOW_TOGGLER:
      return {
        ...state,
        screenToggler: true,
      };
    case UPDATE_SCREEN_TOGGLER_CONTENT:
      return {
        ...state,
        screenTogglerContent: payload,
      };
    case HIDE_TOGGLER:
      return {
        ...state,
        screenToggler: false,
      };
    case CHANGE_CHAT_SCREEN:
      return {
        ...state,
        currentChatScreen: payload,
      };
    default:
      return state;
  }
};

export default chatboxReducers;