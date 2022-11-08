import actions from './actions';

const initialState = {
    options: {},
};

const {
    UPDATE_SETTINGS,
} = actions;

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_SETTINGS:
            return {
                ...state,
                options: {
					...state.options,
					...payload
				},
            };

        default:
            return state;
    }
};

export default reducer;
