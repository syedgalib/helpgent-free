import actions from './actions';

const initialState = {
  messageType: "video",
  videoStage: "home",
  replyMode: false,
  loading: false,
  error: null,
};

const {
  REPLY_MODE_UPDATE_BEGIN,
  REPLY_MODE_UPDATE_SUCCESS,
  REPLY_MODE_UPDATE_ERR,

  MESSAGE_TYPE_UPDATE_BEGIN,
  MESSAGE_TYPE_UPDATE_SUCCESS,
  MESSAGE_TYPE_UPDATE_ERR,

  MESSAGE_STAGE_UPDATE_BEGIN,
  MESSAGE_STAGE_UPDATE_SUCCESS,
  MESSAGE_STAGE_UPDATE_ERR,
} = actions;

const TagReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  console.log(data)
  switch (type) {
    case REPLY_MODE_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case REPLY_MODE_UPDATE_SUCCESS:
      return {
        ...state,
        replyMode: data,
        sLoading: false,
      };
    case REPLY_MODE_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    case MESSAGE_TYPE_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case MESSAGE_TYPE_UPDATE_SUCCESS:
      return {
        ...state,
        messageType: data,
        replyMode: true,
        sLoading: false,
      };
    case MESSAGE_TYPE_UPDATE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    case MESSAGE_STAGE_UPDATE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case MESSAGE_STAGE_UPDATE_SUCCESS:
      return {
        ...state,
        videoStage: data,
        sLoading: false,
      };
    case MESSAGE_STAGE_UPDATE_ERR:
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