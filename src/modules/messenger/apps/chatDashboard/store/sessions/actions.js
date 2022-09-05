const actions = {
    SESSION_READ_BEGIN: 'SESSION_READ_BEGIN',
    SESSION_READ_SUCCESS: 'SESSION_READ_SUCCESS',
    SESSION_READ_ERR: 'SESSION_READ_ERR',

    ADD_TAG_BEGIN: 'ADD_TAG_BEGIN',
    ADD_TAG_SUCCESS: 'ADD_TAG_SUCCESS',
    ADD_TAG_ERR: 'ADD_TAG_ERR',
  
    sessionReadBegin: () => {
      return {
        type: actions.SESSION_READ_BEGIN,
      };
    },
  
    sessionReadSuccess: data => {
      return {
        type: actions.SESSION_READ_SUCCESS,
        data,
      };
    },
  
    sessionReadError: err => {
      return {
        type: actions.SESSION_READ_ERR,
        err,
      };
    },
    
    addTagBegin: () => {
      return {
        type: actions.ADD_TAG_BEGIN,
      };
    },
  
    addTagSuccess: data => {
      return {
        type: actions.ADD_TAG_SUCCESS,
        data,
      };
    },
  
    addTagError: err => {
      return {
        type: actions.ADD_TAG_ERR,
        err,
      };
    },
  };
  
  export default actions;
  