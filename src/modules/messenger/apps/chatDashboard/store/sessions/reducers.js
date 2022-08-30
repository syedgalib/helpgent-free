import actions from './actions';

const initialState = {
  sessions: [],
  loading: false,
  error: null,
};

const {
  SESSION_READ_BEGIN,
  SESSION_READ_SUCCESS,
  SESSION_READ_ERR,

  ADD_TAG_BEGIN,
  ADD_TAG_SUCCESS,
  ADD_TAG_ERR,
} = actions;

const TagReducer = (state = initialState, action) => {
  const { type, data, err } = action;
  switch (type) {
    case SESSION_READ_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case SESSION_READ_SUCCESS:
      return {
        ...state,
        sessions: data,
        loading: false,
      };
    case SESSION_READ_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    case ADD_TAG_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case ADD_TAG_SUCCESS:
      return {
        ...state,
        sessions: data,
        loading: false,
      };
    case ADD_TAG_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default TagReducer;