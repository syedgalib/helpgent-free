const actions = {
    DISPLAY_CHAT_SCREEN_BEGIN: 'DISPLAY_CHAT_SCREEN_BEGIN',
    DISPLAY_CHAT_SCREEN_SUCCESS: 'DISPLAY_CHAT_SCREEN_SUCCESS',
    DISPLAY_CHAT_SCREEN_ERR: 'DISPLAY_CHAT_SCREEN_ERR',
  
    displayChatScreenBegin: () => {
      return {
        type: actions.DISPLAY_CHAT_SCREEN_BEGIN,
      };
    },
  
    displayChatScreenSuccess: () => {
      return {
        type: actions.DISPLAY_CHAT_SCREEN_SUCCESS
      };
    },
  
    displayChatScreenError: err => {
      return {
        type: actions.DISPLAY_CHAT_SCREEN_ERR,
        err,
      };
    },
};
  
export default actions;
  