import actions from './actions';

const {
  changeLayoutDirectionBegin,
  changeLayoutDirectionSuccess,
  changeLayoutDirectionError,
} = actions;

const handleChangeLayoutDirection = direction => {
  return async dispatch => {
    try {
      dispatch(changeLayoutDirectionBegin());
      dispatch(changeLayoutDirectionSuccess(direction));
    } catch (err) {
      dispatch(changeLayoutDirectionError(err));
    }
  };
};

export { handleChangeLayoutDirection };
