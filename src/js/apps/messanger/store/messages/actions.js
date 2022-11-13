const actions = {
    UPDATE_SELECTED_SESSION: 'UPDATE_SELECTED_SESSION',
    ADD_SESSION: 'ADD_SESSION',
    UPDATE_SESSION_MESSAGES: 'UPDATE_SESSION_MESSAGES',
    UPDATE_SESSION_MESSAGES_BY_IDS: 'UPDATE_SESSION_MESSAGES_BY_IDS',
    UPDATE_SESSION_MESSAGE_ITEM: 'UPDATE_SESSION_MESSAGES_ITEM',
    RESET_ALL_SESSIONS: 'RESET_ALL_SESSIONS',

    ADD_SESSION_WINDOW_DATA: 'ADD_SESSION_WINDOW_DATA',
    UPDATE_SESSION_WINDOW_DATA: 'UPDATE_SESSION_WINDOW_DATA',
    RESET_ALL_SESSION_WINDOW_DATA: 'RESET_ALL_SESSION_WINDOW_DATA',

    REPLY_MODE_UPDATE_BEGIN: 'REPLY_MODE_UPDATE_BEGIN',
    REPLY_MODE_UPDATE_SUCCESS: 'REPLY_MODE_UPDATE_SUCCESS',
    REPLY_MODE_UPDATE_ERR: 'REPLY_MODE_UPDATE_ERR',

    MESSAGE_TYPE_UPDATE_BEGIN: 'MESSAGE_TYPE_UPDATE_BEGIN',
    MESSAGE_TYPE_UPDATE_SUCCESS: 'MESSAGE_TYPE_UPDATE_SUCCESS',
    MESSAGE_TYPE_UPDATE_ERR: 'MESSAGE_TYPE_UPDATE_ERR',

    MESSAGE_STAGE_UPDATE_BEGIN: 'MESSAGE_STAGE_UPDATE_BEGIN',
    MESSAGE_STAGE_UPDATE_SUCCESS: 'MESSAGE_STAGE_UPDATE_SUCCESS',
    MESSAGE_STAGE_UPDATE_ERR: 'MESSAGE_STAGE_UPDATE_ERR',

    UPDATE_SCREEN_TOGGLER_CONTENT: 'UPDATE_SCREEN_TOGGLER_CONTENT',

    updateSelectedSession: ( session ) => {
      return {
        type: actions.UPDATE_SELECTED_SESSION,
        data: session,
      };
    },

    addSession: ( sessionID, session ) => {
      return {
        type: actions.ADD_SESSION,
        data: { sessionID, session },
      };
    },

    updateSessionMessages: ( sessionID, sessionMessages ) => {
      return {
        type: actions.UPDATE_SESSION_MESSAGES,
        data: { sessionID, sessionMessages },
      };
    },

    updateSessionMessagesByIDs: ( sessionID, updatedMessages ) => {
      return {
        type: actions.UPDATE_SESSION_MESSAGES_BY_IDS,
        data: { sessionID, updatedMessages },
      };
    },

    updateSessionMessageItem: ( sessionID, messageID, updatedMessage ) => {
      return {
        type: actions.UPDATE_SESSION_MESSAGE_ITEM,
        data: { sessionID, messageID, updatedMessage },
      };
    },

    resetAllSessions: () => {
      return {
        type: actions.RESET_ALL_SESSIONS,
      };
    },

    resetAllSessionWindowData: () => {
      return {
        type: actions.RESET_ALL_SESSION_WINDOW_DATA,
      };
    },

    addSessionWindowData: ( sessionID ) => {
      return {
        type: actions.ADD_SESSION_WINDOW_DATA,
        data: sessionID,
      };
    },

    updateSessionWindowData: ( sessionID, key, value ) => {
      return {
        type: actions.UPDATE_SESSION_WINDOW_DATA,
        data: { sessionID, key, value },
      };
    },

    replyModeUpdateBegin: () => {
      return {
        type: actions.MESSAGE_TYPE_UPDATE_BEGIN,
      };
    },

    replyModeUpdateSuccess: data => {
      return {
        type: actions.REPLY_MODE_UPDATE_SUCCESS,
        data,
      };
    },

    replyModeUpdateError: error => {
      return {
        type: actions.REPLY_MODE_UPDATE_ERR,
        error,
      };
    },

    messageTypeUpdateBegin: () => {
      return {
        type: actions.REPLY_MODE_UPDATE_BEGIN,
      };
    },

    messageTypeUpdateSuccess: data => {
      return {
        type: actions.MESSAGE_TYPE_UPDATE_SUCCESS,
        data,
      };
    },

    messageTypeUpdateError: error => {
      return {
        type: actions.MESSAGE_TYPE_UPDATE_ERR,
        error,
      };
    },

    messageStageUpdateBegin: () => {
      return {
        type: actions.MESSAGE_STAGE_UPDATE_BEGIN,
      };
    },

    messageStageUpdateSuccess: data => {
      return {
        type: actions.MESSAGE_STAGE_UPDATE_SUCCESS,
        data,
      };
    },

    messageStageUpdateError: error => {
      return {
        type: actions.MESSAGE_STAGE_UPDATE_ERR,
        error,
      };
    },

    updateScreenTogglerContent: ( content ) => {
      return {
        type: actions.UPDATE_SCREEN_TOGGLER_CONTENT,
		payload: content,
      };
    },
  };

  export default actions;
