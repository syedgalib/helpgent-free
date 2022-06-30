import actions from './actions';
import screenTypes from './screenTypes';

const initialState = {
	showChatbox: false,
	currentChatScreen: screenTypes.HOME,
};

const {
  SHOW_CHATBOX,
  HIDE_CHATBOX,
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