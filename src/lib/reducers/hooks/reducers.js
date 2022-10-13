import actions from './actions';

const initialState = {
    actions: {},
};

const { DO_ACTION, ADD_ACTION } = actions;

const Reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case DO_ACTION:

			const actionKeys = Object.keys( state.actions );

			console.log( 'DO_ACTION', { payload, actionKeys } );

			if ( ! actionKeys.length ) {
				return state;
			}

			for ( const actionKey of actionKeys ) {
				if ( actionKey === payload.key ) {
					const callbacks = state.actions[ actionKey ];

					if ( ! callbacks.length ) {
						continue;
					}

					for ( const callback of callbacks ) {
						callback( payload.args );
					}

				}
			}

            return state;
        case ADD_ACTION:

			const callbacks = ( typeof state.actions[ payload.key ] !== 'undefined' ) ?
			[ ...state.actions[ payload.key ], payload.callback ] :
			[ payload.callback ];

			console.log( 'ADD_ACTION', { payload, callbacks } );

            return {
                ...state,
                actions: {
                    ...state.actions,
                    [payload.key]: callbacks,
                },
            };
        default:
            return state;
    }
};

export default Reducer;
