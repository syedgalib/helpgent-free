const actions = {
    SHOW_CHATBOX: 'SHOW_CHATBOX',
    HIDE_CHATBOX: 'HIDE_CHATBOX',
    SHOW_TOGGLER: 'SHOW_TOGGLER',
    UPDATE_SCREEN_TOGGLER_CONTENT: 'UPDATE_SCREEN_TOGGLER_CONTENT',
    HIDE_TOGGLER: 'HIDE_TOGGLER',
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

    showToggler: () => {
      return {
        type: actions.SHOW_TOGGLER,
      };
    },

    updateScreenTogglerContent: ( content ) => {
      return {
        type: actions.UPDATE_SCREEN_TOGGLER_CONTENT,
		payload: content,
      };
    },

    hideToggler: () => {
      return {
        type: actions.HIDE_TOGGLER,
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
