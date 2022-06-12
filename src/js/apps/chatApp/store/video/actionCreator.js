import actions from './actions';

const {
  recordStageChangeBegin,
  recordStageChangeSuccess,
  recordStageChangeError,
} = actions;

const changeRecordSyage = stage => {
  return async dispatch => {
    try {
      dispatch(recordStageChangeBegin());
      dispatch(recordStageChangeSuccess(stage));
    } catch (err) {
      dispatch(recordStageChangeError(err));
    }
  };
};

export { changeRecordSyage };
