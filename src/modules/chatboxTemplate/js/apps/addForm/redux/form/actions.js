const actions = {
  FORM_READ_BEGIN: 'FORM_READ_BEGIN',
  FORM_READ_SUCCESS: 'FORM_READ_SUCCESS',
  FORM_READ_ERR: 'FORM_READ_ERR',

  FORM_ADD_BEGIN: 'FORM_ADD_BEGIN',
  FORM_ADD_SUCCESS: 'FORM_ADD_SUCCESS',
  FORM_ADD_ERR: 'FORM_ADD_ERR',

  addFormBegin: () => {
    return {
      type: actions.FORM_ADD_BEGIN,
    };
  },

  addFormSuccess: data => {
    return {
      type: actions.FORM_ADD_SUCCESS,
      data,
    };
  },

  addFormErr: err => {
    return {
      type: actions.FORM_ADD_ERR,
      err,
    };
  },

  formReadBegin: () => {
    return {
      type: actions.FORM_READ_BEGIN,
    };
  },

  formReadSuccess: data => {
    return {
      type: actions.FORM_READ_SUCCESS,
      data,
    };
  },

  formReadErr: err => {
    return {
      type: actions.FORM_READ_ERR,
      err,
    };
  },
};

export default actions;
