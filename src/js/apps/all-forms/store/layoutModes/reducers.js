import actions from './actions';

const initialState = {
  dir: "ltr",
  loading: false,
  error: null,
};

const {
  CHANGE_LAYOUT_DIRECTION_BEGIN,
  CHANGE_LAYOUT_DIRECTION_SUCCESS,
  CHANGE_LAYOUT_DIRECTION_ERR,
} = actions;

const ChangeLayoutReducer = (state = initialState, action) => {
  const { type, direction, err } = action;
  switch (type) {
    case CHANGE_LAYOUT_DIRECTION_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case CHANGE_LAYOUT_DIRECTION_SUCCESS:
      return {
        ...state,
        dir: direction,
        loading: false,
      };
    case CHANGE_LAYOUT_DIRECTION_ERR:
      return {
        ...state,
        error: err,
        loading: false,
      };
    default:
      return state;
  }
};

export default ChangeLayoutReducer;