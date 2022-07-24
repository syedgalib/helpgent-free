const actions = {
    TAG_LIST_MODAL_UPDATE_BEGIN: 'TAG_LIST_MODAL_UPDATE_BEGIN',
    TAG_LIST_MODAL_UPDATE_SUCCESS: 'TAG_LIST_MODAL_UPDATE_SUCCESS',
    TAG_LIST_MODAL_UPDATE_ERR: 'TAG_LIST_MODAL_UPDATE_ERR',

    TAG_FORM_MODAL_UPDATE_BEGIN: 'TAG_FORM_MODAL_UPDATE_BEGIN',
    TAG_FORM_MODAL_UPDATE_SUCCESS: 'TAG_FORM_MODAL_UPDATE_SUCCESS',
    TAG_FORM_MODAL_UPDATE_ERR: 'TAG_FORM_MODAL_UPDATE_ERR',
  
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

    tagFormModalUpdatenBegin: () => {
      return {
        type: actions.TAG_FORM_MODAL_UPDATE_BEGIN,
      };
    },
  
    tagFormModalUpdateSuccess: status => {
      return {
        type: actions.TAG_FORM_MODAL_UPDATE_SUCCESS,
        status,
      };
    },
  
    tagFormModalUpdateError: err => {
      return {
        type: actions.TAG_FORM_MODAL_UPDATE_ERR,
        err,
      };
    },
  };
  
  export default actions;
  