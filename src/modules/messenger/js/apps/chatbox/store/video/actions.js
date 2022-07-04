const actions = {
    RECORD_STAGE_CHANGE_BEGIN: 'RECORD_STAGE_CHANGE_BEGIN',
    RECORD_STAGE_CHANGE_SUCCESS: 'RECORD_STAGE_CHANGE_SUCCESS',
    RECORD_STAGE_CHANGE_ERR: 'RECORD_STAGE_CHANGE_ERR',
  
    recordStageChageBegin: () => {
      return {
        type: actions.RECORD_STAGE_CHANGE_BEGIN,
      };
    },
  
    recordStageChagSuccess: data => {
      return {
        type: actions.RECORD_STAGE_CHANGE_SUCCESS,
        data,
      };
    },
  
    recordStageChagErr: error => {
      return {
        type: actions.RECORD_STAGE_CHANGE_ERR,
        error,
      };
    },
  };
  
  export default actions;
  