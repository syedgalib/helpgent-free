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
  const { type, row, err } = action;
  switch (type) {
    case RECORD_STAGE_CHANGE_BEGIN:
      return {
        ...state,
        sLoading: true,
      };
    case RECORD_STAGE_CHANGE_SUCCESS:
      return {
        ...state,
        row,
        sLoading: false,
      };
    case RECORD_STAGE_CHANGE_ERR:
      return {
        ...state,
        error: err,
        sLoading: false,
      };
    default:
      return state;
  }
};

export default VideoReducer;