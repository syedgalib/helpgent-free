const actions = {
    REPLY_MODE_UPDATE_BEGIN: 'REPLY_MODE_UPDATE_BEGIN',
    REPLY_MODE_UPDATE_SUCCESS: 'REPLY_MODE_UPDATE_SUCCESS',
    REPLY_MODE_UPDATE_ERR: 'REPLY_MODE_UPDATE_ERR',

    MESSAGE_TYPE_UPDATE_BEGIN: 'MESSAGE_TYPE_UPDATE_BEGIN',
    MESSAGE_TYPE_UPDATE_SUCCESS: 'MESSAGE_TYPE_UPDATE_SUCCESS',
    MESSAGE_TYPE_UPDATE_ERR: 'MESSAGE_TYPE_UPDATE_ERR',

    MESSAGE_STAGE_UPDATE_BEGIN: 'MESSAGE_STAGE_UPDATE_BEGIN',
    MESSAGE_STAGE_UPDATE_SUCCESS: 'MESSAGE_STAGE_UPDATE_SUCCESS',
    MESSAGE_STAGE_UPDATE_ERR: 'MESSAGE_STAGE_UPDATE_ERR',

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
  };

  export default actions;
