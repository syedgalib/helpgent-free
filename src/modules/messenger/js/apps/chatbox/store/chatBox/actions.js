const actions = {
    SHOW_CHATBOX: 'SHOW_CHATBOX',
    HIDE_CHATBOX: 'HIDE_CHATBOX',
    CHANGE_CHAT_SCREEN: 'CHANGE_CHAT_SCREEN',

    showChatbox: () => {
      return {
        type: actions.SHOW_CHATBOX,
      };
    },

    hideChatbox: () => {
      return {
        type: actions.HIDE_CHATBOX,
      };
    },

    changeChatScreen: ( sceenType ) => {
      return {
        type: actions.CHANGE_CHAT_SCREEN,
        payload: sceenType,
      };
    },
};
  
export default actions;
  