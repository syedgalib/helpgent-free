import { combineReducers } from 'redux';
import hooks from 'Reducers/hooks/reducers';
import tags from './tags/reducers';
import messages from './messages/reducers';
import sessions from './sessions/reducers';

const rootReducers = combineReducers({
  hooks,
  tags,
  messages,
  sessions,
});

export default rootReducers;