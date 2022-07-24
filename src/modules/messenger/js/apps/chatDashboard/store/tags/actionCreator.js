import actions from './actions';

const {
  tagListModalUpdatenBegin,
  tagListModalUpdateSuccess,
  tagListModalUpdateError,

  tagFormModalUpdatenBegin,
  tagFormModalUpdateSuccess,
  tagFormModalUpdateError,
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

export { handleTagModal, handleTagFormModal };
