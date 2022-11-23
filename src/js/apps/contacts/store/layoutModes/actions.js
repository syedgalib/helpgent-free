const actions = {
  CHANGE_LAYOUT_DIRECTION_BEGIN: 'CHANGE_LAYOUT_DIRECTION_BEGIN',
  CHANGE_LAYOUT_DIRECTION_SUCCESS: 'CHANGE_LAYOUT_DIRECTION_SUCCESS',
  CHANGE_LAYOUT_DIRECTION_ERR: 'CHANGE_LAYOUT_DIRECTION_ERR',

  changeLayoutDirectionBegin: () => {
    return {
      type: actions.CHANGE_LAYOUT_DIRECTION_BEGIN,
    };
  },

  changeLayoutDirectionSuccess: direction => {
    return {
      type: actions.CHANGE_LAYOUT_DIRECTION_SUCCESS,
      direction,
    };
  },

  changeLayoutDirectionError: err => {
    return {
      type: actions.CHANGE_LAYOUT_DIRECTION_ERR,
      err,
    };
  }
};
  
export default actions;
  