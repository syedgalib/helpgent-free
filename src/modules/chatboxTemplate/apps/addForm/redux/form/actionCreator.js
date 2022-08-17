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
      await dispatch(addFormBegin());
      apiService.dataAdd(`/chatbox-templates`, args)
          
          .then(response => {
            console.log(response);
            // await dispatch(addFormSuccess(response.data));
          })
          .catch((error) => {
              console.log(error)
          })
      // dispatch(addFormSuccess(data));
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

