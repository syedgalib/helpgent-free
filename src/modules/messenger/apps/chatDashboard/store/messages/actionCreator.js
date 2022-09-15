import actions from './actions';

const {
    updateSelectedSession,
    addSession,
    updateSessionMessages,
    replyModeUpdateBegin,
    replyModeUpdateSuccess,
    replyModeUpdateError,

    messageTypeUpdateBegin,
    messageTypeUpdateSuccess,
    messageTypeUpdateError,

    messageStageUpdateBegin,
    messageStageUpdateSuccess,
    messageStageUpdateError,
} = actions;

const handleReplyModeChange = (status) => {
    return async (dispatch) => {
        try {
            dispatch(replyModeUpdateBegin());
            dispatch(replyModeUpdateSuccess(status));
        } catch (error) {
            dispatch(replyModeUpdateError(error));
        }
    };
};

const handleMessageTypeChange = (status) => {
    return async (dispatch) => {
        try {
            dispatch(messageTypeUpdateBegin());
            dispatch(messageTypeUpdateSuccess(status));
        } catch (error) {
            dispatch(messageTypeUpdateError(error));
        }
    };
};

const handleMessageStageChange = (stage) => {
    return async (dispatch) => {
        try {
            dispatch(messageStageUpdateBegin());
            dispatch(messageStageUpdateSuccess(stage));
        } catch (error) {
            dispatch(messageStageUpdateError(error));
        }
    };
};

export {
    updateSelectedSession,
    addSession,
    updateSessionMessages,
    handleReplyModeChange,
    handleMessageTypeChange,
    handleMessageStageChange,
};
