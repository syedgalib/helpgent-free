import actions from './actions';

const initialState = {
  messageType: "video",
  replyMode: true,
  loading: false,
  error: null,
};

const {
  MESSAGE_TYPE_UPDATE_BEGIN,
  MESSAGE_TYPE_UPDATE_SUCCESS,
  MESSAGE_TYPE_UPDATE_ERR,
} = actions;

const TagReducer = (state = initialState, action) => {
  const { type, messageType, err } = action;
  switch (type) {
    case MESSAGE_TYPE_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case MESSAGE_TYPE_UPDATE_SUCCESS:
      return {
        ...state,
        messageType: messageType,
        sLoading: false,
      };
    case MESSAGE_TYPE_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    default:
      return state;
  }
};

export default TagReducer;