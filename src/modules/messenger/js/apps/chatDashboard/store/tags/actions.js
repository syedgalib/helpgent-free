const actions = {
    TAG_LIST_MODAL_UPDATE_BEGIN: 'TAG_LIST_MODAL_UPDATE_BEGIN',
    TAG_LIST_MODAL_UPDATE_SUCCESS: 'TAG_LIST_MODAL_UPDATE_SUCCESS',
    TAG_LIST_MODAL_UPDATE_ERR: 'TAG_LIST_MODAL_UPDATE_ERR',
  
    tagListModalUpdatenBegin: () => {
      return {
        type: actions.TAG_LIST_MODAL_UPDATE_BEGIN,
      };
    },
  
    tagListModalUpdateSuccess: status => {
      return {
        type: actions.TAG_LIST_MODAL_UPDATE_SUCCESS,
        status,
      };
    },
  
    tagListModalUpdateError: err => {
      return {
        type: actions.TAG_LIST_MODAL_UPDATE_ERR,
        err,
      };
    },
  };
  
  export default actions;
  