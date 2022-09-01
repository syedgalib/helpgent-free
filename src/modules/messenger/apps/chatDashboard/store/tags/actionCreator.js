import actions from './actions';

const {
  tagEditBegin,
  tagEditSuccess,
  tagEditError,

  setSessionBegin,
  setSessionSuccess,
  setSessionError,

  tagListModalUpdatenBegin,
  tagListModalUpdateSuccess,
  tagListModalUpdateError,

  tagFormModalUpdatenBegin,
  tagFormModalUpdateSuccess,
  tagFormModalUpdateError,

  deleteConfirmationBegin,
  deleteConfirmationSuccess,
  deleteConfirmationError,
} = actions;

const handleTagModal = status => {
  return async dispatch => {
    try {
      dispatch(tagListModalUpdatenBegin());
      dispatch(tagListModalUpdateSuccess(status));
    } catch (err) {
      dispatch(tagListModalUpdateError(err));
    }
  };
};
const handleSetSession = id => {
  return async dispatch => {
    try {
      dispatch(setSessionBegin());
      dispatch(setSessionSuccess(id));
    } catch (err) {
      dispatch(setSessionError(err));
    }
  };
};

const handleTagEdit = (status, data) => {
  return async dispatch => {
    try {
      dispatch(tagEditBegin());
      dispatch(tagEditSuccess(status));
    } catch (err) {
      dispatch(tagEditError(err));
    }
  };
};

const handleTagFormModal = status => {
  return async dispatch => {
    try {
      dispatch(tagFormModalUpdatenBegin());
      dispatch(tagFormModalUpdateSuccess(status));
    } catch (err) {
      dispatch(tagFormModalUpdateError(err));
    }
  };
};

const handleDeleteConfirmationModal = status => {
  return async dispatch => {
    try {
      dispatch(deleteConfirmationBegin());
      dispatch(deleteConfirmationSuccess(status));
    } catch (err) {
      dispatch(deleteConfirmationError(err));
    }
  };
};

export { handleTagModal, handleSetSession, handleTagEdit, handleTagFormModal, handleDeleteConfirmationModal };
