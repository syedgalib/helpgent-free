import actions from './actions';

const {
  tagListModalUpdatenBegin,
  tagListModalUpdateSuccess,
  tagListModalUpdateError,
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

export { handleTagModal };
