import actions from './actions';

const {
  replyModeUpdateBegin,
  replyModeUpdateSuccess,
  replyModeUpdateError,

  messageTypeUpdateBegin,
  messageTypeUpdateSuccess,
  messageTypeUpdateError,

  messageStageUpdateBegin,
  messageStageUpdateSuccess,
  messageStageUpdateError
} = actions;

const handleReplyModeChange = status => {
  return async dispatch => {
    try {
      dispatch(replyModeUpdateBegin());
      dispatch(replyModeUpdateSuccess(status));
    } catch (err) {
      dispatch(replyModeUpdateError(err));
    }
  };
};

const handleMessageTypeChange = status => {
  return async dispatch => {
    try {
      dispatch(messageTypeUpdateBegin());
      dispatch(messageTypeUpdateSuccess(status));
    } catch (err) {
      dispatch(messageTypeUpdateError(err));
    }
  };
};

const handleMessageStageChange = stage => {
  return async dispatch => {
    try {
      dispatch(messageStageUpdateBegin());
      dispatch(messageStageUpdateSuccess(stage));
    } catch (err) {
      dispatch(messageStageUpdateError(err));
    }
  };
};

export { handleReplyModeChange, handleMessageTypeChange, handleMessageStageChange };
