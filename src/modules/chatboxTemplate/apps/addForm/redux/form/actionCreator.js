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
  
  formUpdateBegin,
  formUpdateSuccess,
  formUpdateErr,
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
      console.log(data);
      dispatch(formReadSuccess(data));
    } catch (err) {
      dispatch(formReadErr(err));
    }
  };
};

const updateDataWithId = id => {
  console.log('tes')
  return async dispatch => {
    // try {
      dispatch(formUpdateBegin(id));
      await apiService.getAll(`/chatbox-templates/${id}`)
        .then(response => {
            dispatch(formUpdateSuccess([response.data.data]));
        })
        .catch((error) => {
          dispatch(formUpdateErr(err));
        });
    // } catch (err) {
    //   console.log(err);
    //   dispatch(formReadErr(err));
    // }
  };
};



export { addForm, handleDynamicEdit, updateDataWithId };

