const actions = {
    UPDATE_SETTINGS: 'UPDATE_SETTINGS',

    updateSettings: ( options ) => {
      return {
        type: actions.UPDATE_SETTINGS,
		payload: options,
      };
    },
  };

  export default actions;
