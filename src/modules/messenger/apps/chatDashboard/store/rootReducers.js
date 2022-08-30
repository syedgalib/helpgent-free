import { combineReducers } from 'redux';
import tags from './tags/reducers';
import messages from './messages/reducers';
import sessions from './sessions/reducers';

const rootReducers = combineReducers({
  tags,
  messages,
  sessions,
});
  
export default rootReducers;