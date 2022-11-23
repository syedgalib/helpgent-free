import actions from './actions';
const videoFrom = [
  {
    stage: "home"
  }
]

const initialState = {
  row: videoFrom,
  loading: false,
  error: null,
};

const {
    RECORD_STAGE_CHANGE_BEGIN,
    RECORD_STAGE_CHANGE_SUCCESS,
    RECORD_STAGE_CHANGE_ERR
} = actions;

const VideoReducer = (state = initialState, action) => {
  const { type, row, error } = action;
  switch (type) {
    case RECORD_STAGE_CHANGE_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case RECORD_STAGE_CHANGE_SUCCESS:
      return {
        ...state,
        row,
        isLoading: false,
      };
    case RECORD_STAGE_CHANGE_ERR:
      return {
        ...state,
        error,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default VideoReducer;