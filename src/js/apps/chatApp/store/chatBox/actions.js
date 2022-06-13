const actions = {
    DISPLAY_CHAT_SCREEN_BEGIN: 'DISPLAY_CHAT_SCREEN_BEGIN',
    DISPLAY_CHAT_SCREEN_SUCCESS: 'DISPLAY_CHAT_SCREEN_SUCCESS',
    DISPLAY_CHAT_SCREEN_ERR: 'DISPLAY_CHAT_SCREEN_ERR',

    CHANGE_CHAT_SCREEN_BEGIN: 'CHANGE__CHAT_SCREEN_BEGIN',
    CHANGE_CHAT_SCREEN_SUCCESS: 'CHANGE_CHAT_SCREEN_SUCCESS',
    CHANGE_CHAT_SCREEN_ERR: 'CHANGE_CHAT_SCREEN_ERR',

    CLOSE_CHAT_SCREEN_BEGIN: 'CLOSE_CHAT_SCREEN_BEGIN',
    CLOSE_CHAT_SCREEN_SUCCESS: 'CLOSE_CHAT_SCREEN_SUCCESS',
    CLOSE_CHAT_SCREEN_ERR: 'CLOSE_CHAT_SCREEN_ERR',
  
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
    changeChatScreenBegin: () => {
      return {
        type: actions.CHANGE_CHAT_SCREEN_BEGIN
      };
    },
  
    changeChatScreenSuccess: (chatType) => {
      return {
        type: actions.CHANGE_CHAT_SCREEN_SUCCESS,
        data: chatType
      };
    },
  
    changeChatScreenError: err => {
      return {
        type: actions.CHANGE_CHAT_SCREEN_ERR,
        err,
      };
    },
    closeChatScreenBegin: () => {
      return {
        type: actions.CLOSE_CHAT_SCREEN_BEGIN,
      };
    },
    closeChatScreenSuccess: () => {
      return {
        type: actions.CLOSE_CHAT_SCREEN_SUCCESS
      };
    },
    closeChatScreenError: err => {
      return {
        type: actions.CLOSE_CHAT_SCREEN_ERR,
        err,
      };
    },
};
  
export default actions;
  