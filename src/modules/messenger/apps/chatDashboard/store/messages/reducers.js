import actions from './actions';

const initialState = {
    paginationPerPage: 10,
    selectedSession: null,
    allSessions: {},

    allSessionWindowData: {},
	defaultSessionWindowData: {
		openSearch: false,
		isSearching: false,
		isShowingVideoSearchResult: false,
		isShowingVoiceSearchResult: false,
		searchKeyword: '',
		searchQueryArgs: {},
		searchResults: [],
		messageType: 'video',
		videoStage: 'home',
		replyMode: false,
		messagesContainerScrollMeta: null,
	},

    messageType: 'video',
    videoStage: 'home',
    replyMode: false,

    loading: false,
    error: null,
};

const {
    UPDATE_SELECTED_SESSION,
    ADD_SESSION,
    UPDATE_SESSION_MESSAGES,
    UPDATE_SESSION_MESSAGE_ITEM,

    ADD_SESSION_WINDOW_DATA,
    UPDATE_SESSION_WINDOW_DATA,

    REPLY_MODE_UPDATE_BEGIN,
    REPLY_MODE_UPDATE_SUCCESS,
    REPLY_MODE_UPDATE_ERR,

    MESSAGE_TYPE_UPDATE_BEGIN,
    MESSAGE_TYPE_UPDATE_SUCCESS,
    MESSAGE_TYPE_UPDATE_ERR,

    MESSAGE_STAGE_UPDATE_BEGIN,
    MESSAGE_STAGE_UPDATE_SUCCESS,
    MESSAGE_STAGE_UPDATE_ERR,
} = actions;

const Reducer = (state = initialState, action) => {
    const { type, data, error } = action;
    switch (type) {
        case UPDATE_SELECTED_SESSION:
            return {
                ...state,
                selectedSession: data,
            };

        case ADD_SESSION:

            if ( !data.sessionID ) {
                return state;
            }

            if ( ! data.session) {
                return state;
            }

            if ( Object.keys( state.allSessions ).includes( data.sessionID ) ){
                return state;
            }

            return {
                ...state,
                allSessions: { ...state.allSessions, [data.sessionID]: data.session },
            };

        case UPDATE_SESSION_MESSAGES:

            if ( !data.sessionID ) {
                return state;
            }

            if ( ! data.sessionMessages) {
                return state;
            }

            if ( ! Object.keys( state.allSessions ).includes( data.sessionID ) ){
                return state;
            }

            return {
                ...state,
                allSessions: { ...state.allSessions, [data.sessionID]: data.sessionMessages },
            };

        case UPDATE_SESSION_MESSAGE_ITEM:

            if ( ! data.sessionID ) {
                return state;
            }

            if ( ! data.messageID ) {
                return state;
            }

            if ( ! data.updatedMessage ) {
                return state;
            }

            if ( ! Object.keys( state.allSessions ).includes( data.sessionID ) ){
                return state;
            }

            return {
                ...state,
                allSessions: {
					...state.allSessions,
					[data.sessionID]: state.allSessions[data.sessionID].map(
						message => ( message.id === data.messageID ) ? { ...message, ...data.updatedMessage } : message
					)
				},
            };

        case ADD_SESSION_WINDOW_DATA:

            if ( !data ) {
                return state;
            }

            if ( Object.keys( state.allSessionWindowData ).includes( data ) ){
                return state;
            }

			const newWindowData = JSON.parse( JSON.stringify( state.defaultSessionWindowData ) );
            return {
                ...state,
                allSessionWindowData: { ...state.allSessionWindowData, [data]: newWindowData },
            };

        case UPDATE_SESSION_WINDOW_DATA:

            if ( !data.sessionID ) {
                return state;
            }

            if ( typeof data.key === 'undefined' ) {
                return state;
            }

            if ( typeof data.value === 'undefined' ) {
                return state;
            }

            if ( ! Object.keys( state.allSessionWindowData ).includes( data.sessionID ) ){
                return state;
            }

            if ( ! Object.keys( state.allSessionWindowData[ data.sessionID ] ).includes( data.key ) ){
                return state;
            }

            return {
                ...state,
                allSessionWindowData: {
					...state.allSessionWindowData,
					[data.sessionID]: {
						...state.allSessionWindowData[ data.sessionID ],
						[ data.key ]: data.value,
					}
				},
            };

        case REPLY_MODE_UPDATE_BEGIN:
            return {
                ...state,
                sLoading: true,
            };
        case REPLY_MODE_UPDATE_SUCCESS:
            return {
                ...state,
                replyMode: data,
                sLoading: false,
            };
        case REPLY_MODE_UPDATE_ERR:
            return {
                ...state,
                error: error,
                sLoading: false,
            };
        case MESSAGE_TYPE_UPDATE_BEGIN:
            return {
                ...state,
                sLoading: true,
            };
        case MESSAGE_TYPE_UPDATE_SUCCESS:
            return {
                ...state,
                messageType: data,
                replyMode: true,
                sLoading: false,
            };
        case MESSAGE_TYPE_UPDATE_ERR:
            return {
                ...state,
                error: error,
                sLoading: false,
            };
        case MESSAGE_STAGE_UPDATE_BEGIN:
            return {
                ...state,
                sLoading: true,
            };
        case MESSAGE_STAGE_UPDATE_SUCCESS:
            return {
                ...state,
                videoStage: data,
                sLoading: false,
            };
        case MESSAGE_STAGE_UPDATE_ERR:
            return {
                ...state,
                error: error,
                sLoading: false,
            };
        default:
            return state;
    }
};

export default Reducer;
