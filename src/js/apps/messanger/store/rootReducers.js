import { combineReducers } from 'redux';
import tags from './tags/reducers';
import messages from './messages/reducers';
import sessions from './sessions/reducers';
import changeLayout from './layoutModes/reducers';

const rootReducers = combineReducers({
  tags,
  messages,
  sessions,
  changeLayout
});

export default rootReducers;