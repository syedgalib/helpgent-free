const actions = {
    DO_ACTION: 'DO_ACTION',
    ADD_ACTION: 'ADD_ACTION',

    doAction: ( key, args ) => {
      return {
        type: actions.DO_ACTION,
        payload: { key, args },
      };
    },

    addAction: ( key, callback ) => {
      return {
        type: actions.ADD_ACTION,
		payload: { key, callback },
      };
    },
};

export default actions;
