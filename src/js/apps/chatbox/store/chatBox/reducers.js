import actions from './actions';
import screenTypes from './screenTypes';

const initialState = {
	showChatbox: false,
  screenToggler: false,
  screenRecordTime: "00:00",
	currentChatScreen: screenTypes.HOME,
};

const {
  SHOW_CHATBOX,
  HIDE_CHATBOX,
  SHOW_TOGGLER,
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