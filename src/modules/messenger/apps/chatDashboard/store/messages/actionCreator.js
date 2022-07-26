import actions from './actions';

const {
  messageTypeUpdateBegin,
  messageTypeUpdateSuccess,
  messageTypeUpdateError
} = actions;

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

export { handleMessageTypeChange };
