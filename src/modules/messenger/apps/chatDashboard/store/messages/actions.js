const actions = {
    MESSAGE_TYPE_UPDATE_BEGIN: 'MESSAGE_TYPE_UPDATE_BEGIN',
    MESSAGE_TYPE_UPDATE_SUCCESS: 'MESSAGE_TYPE_UPDATE_SUCCESS',
    MESSAGE_TYPE_UPDATE_ERR: 'MESSAGE_TYPE_UPDATE_ERR',
  
    mesageTypeUpdateBegin: () => {
      return {
        type: actions.MESSAGE_TYPE_UPDATE_BEGIN,
      };
    },
  
    mesageTypeUpdateSuccess: status => {
      return {
        type: actions.MESSAGE_TYPE_UPDATE_SUCCESS,
        status,
      };
    },
  
    mesageTypeUpdateError: err => {
      return {
        type: actions.MESSAGE_TYPE_UPDATE_ERR,
        err,
      };
    },
  };
  
  export default actions;
  