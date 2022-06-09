import actions from './actions';
// import initialState from '../../demoData/note.json';

const {
  formReadBegin,
  formReadSuccess,

  addFormBegin,
  addFormSuccess,
  formReadErr,
  addFormErr,
} = actions;

const addForm = data => {
  return async dispatch => {
    try {
      dispatch(addFormBegin());
      dispatch(addFormSuccess(data));
    } catch (err) {
      dispatch(addFormErr(err));
    }
  };
};

const onFormEdit = data => {
  return async dispatch => {
    try {
      dispatch(formReadBegin());
      dispatch(formReadSuccess(data));
    } catch (err) {
      dispatch(formReadErr(err));
    }
  };
};

export { addForm, onFormEdit };
