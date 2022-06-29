import actions from './actions';

const {
  displayChatScreenBegin,
  displayChatScreenSuccess,
  displayChatScreenError,

  changeChatScreenBegin,
  changeChatScreenSuccess,
  changeChatScreenError,

  closeChatScreenBegin,
  closeChatScreenSuccess,
  closeChatScreenError,
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

const changeChatScreen = (chatType) => {
  return async dispatch => {
    try {
      dispatch(changeChatScreenBegin());
      dispatch(changeChatScreenSuccess(chatType));
    } catch (err) {
      dispatch(changeChatScreenError(err));
    }
  };
};

const closeChatBox = () => {
  return async dispatch => {
    try {
      dispatch(closeChatScreenBegin());
      dispatch(closeChatScreenSuccess());
    } catch (err) {
      dispatch(closeChatScreenError(err));
    }
  };
};

export { displayChatBox, changeChatScreen, closeChatBox };
