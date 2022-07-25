import actions from './actions';

const initialState = {
  name: "",
	email: "",
	data: {},
	displayChatScreen: false,
	chatScreen: "welcome", // welcome, video, audio, text, screenRecord, contactForm, sending, success
	chatStep: 1, // 1,2,3,4 etc + contact, sending, success
};

const {
    DISPLAY_CHAT_SCREEN_BEGIN,
    DISPLAY_CHAT_SCREEN_SUCCESS,
    DISPLAY_CHAT_SCREEN_ERR,

    CHANGE_CHAT_SCREEN_BEGIN,
    CHANGE_CHAT_SCREEN_SUCCESS,
    CHANGE_CHAT_SCREEN_ERR,

    CLOSE_CHAT_SCREEN_BEGIN,
    CLOSE_CHAT_SCREEN_SUCCESS,
    CLOSE_CHAT_SCREEN_ERR,
} = actions;

const chatboxReducers = (state = initialState, action) => {
  const { type, data, err } = action;
  const { displayChatScreen } = initialState;
  console.log(data);
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
    case CHANGE_CHAT_SCREEN_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case CHANGE_CHAT_SCREEN_SUCCESS:
      return {
        ...state,
        chatScreen: data,
        sLoading: false,
      };
    case CHANGE_CHAT_SCREEN_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    case CLOSE_CHAT_SCREEN_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case CLOSE_CHAT_SCREEN_SUCCESS:
      console.log(displayChatScreen);
      return {
        ...state,
        displayChatScreen: displayChatScreen,
        chatScreen: "welcome",
      };
    case CLOSE_CHAT_SCREEN_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    default:
      return state;
  }
};

export default chatboxReducers;