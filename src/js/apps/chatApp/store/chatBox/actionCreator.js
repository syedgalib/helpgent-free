import actions from './actions';

const {
  displayChatScreenBegin,
  displayChatScreenSuccess,
  displayChatScreenError,
} = actions;

const displayChatBox = () => {
  return async dispatch => {
    try {
      dispatch(displayChatScreenBegin());
      dispatch(displayChatScreenSuccess());
    } catch (err) {
      dispatch(displayChatScreenError(err));
    }
  };
};

export { displayChatBox };
