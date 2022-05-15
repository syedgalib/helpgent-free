import actions from './actions';
// import initialState from '../../demoData/note.json';

const {
  addFormBegin,
  addFormSuccess,
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


export { addForm };
