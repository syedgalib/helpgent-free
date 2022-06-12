import actions from './actions';

const initialState = {
  name: "",
	email: "",
	data: {},
	displayChatScreen: true,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord, contactForm, sending, success
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

const {
    DISPLAY_CHAT_SCREEN_BEGIN,
    DISPLAY_CHAT_SCREEN_SUCCESS,
    DISPLAY_CHAT_SCREEN_ERR
} = actions;

const chatboxReducers = (state = initialState, action) => {
  const { type, data, err } = action;
  const { displayChatScreen } = initialState;
  switch (type) {
    case DISPLAY_CHAT_SCREEN_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case DISPLAY_CHAT_SCREEN_SUCCESS:
      return {
        ...state,
        displayChatScreen: !displayChatScreen,
        sLoading: false,
      };
    case DISPLAY_CHAT_SCREEN_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    default:
      return state;
  }
  console.log(displayChatScreen);
};

export default chatboxReducers;