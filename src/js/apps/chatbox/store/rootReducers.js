import { combineReducers } from 'redux';
import settings from './settings/reducer';
import video from './video/reducers';
import chatbox from './chatbox/reducers';
import chatboxTemplate from './chatboxTemplate/reducer';

import messengerForm from './forms/messenger/reducer';
import attachmentForm from './forms/attachment/reducer';
import userForm from './forms/user/reducer';
import changeLayout from './layoutModes/reducers';

const rootReducers = combineReducers({
    settings,
    video,
    chatbox,
    chatboxTemplate,
    messengerForm,
    attachmentForm,
    userForm,
    changeLayout
});

export default rootReducers;
