import apiService from 'apiService/Service.js';
import actions from './actions';
// import initialState from '../../demoData/note.json';

const {
  formReadBegin,
  formReadSuccess,
  formReadErr,

  addFormBegin,
  addFormSuccess,
  addFormErr,
} = actions;

const addForm = args => {
  return async dispatch => {
    try {
      dispatch(addFormBegin());
      await apiService.dataAdd(`/chatbox-templates`, args)
          .then(response => {
            console.log(response);
            dispatch(addFormSuccess(JSON.stringify(response)));
          })
          .catch((error) => {
              console.log(error)
          })
    } catch (err) {
      dispatch(addFormErr(err));
    }
  };
};

const handleDynamicEdit = data => {
  return async dispatch => {
    try {
      dispatch(formReadBegin());
      dispatch(formReadSuccess(data));
    } catch (err) {
      dispatch(formReadErr(err));
    }
  };
};

export { addForm, handleDynamicEdit };

