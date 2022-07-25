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
    } catch (error) {
      dispatch(recordStageChangeError(error));
    }
  };
};

export { changeRecordSyage };
