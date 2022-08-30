import actions from './actions';

const {
  sessionReadBegin,
  sessionReadSuccess,
  sessionReadError,

  addTagBegin,
  addTagSuccess,
  addTagError,
} = actions;

const handleReadSessions = data => {
  return async dispatch => {
    try {
      dispatch(sessionReadBegin());
      dispatch(sessionReadSuccess(data));
    } catch (err) {
      dispatch(sessionReadError(err));
    }
  };
};

const addTag = args => {
  return async dispatch => {
    try {
      dispatch(addTagBegin());
      await apiService.dataAdd(`/chatbox-templates`, args)
          .then(response => {
            dispatch(addTagSuccess(JSON.stringify(response)));
          })
          .catch((error) => {
              console.log(error)
          })
    } catch (err) {
      dispatch(addTagError(err));
    }
  };
};

export { handleReadSessions, addTag };
