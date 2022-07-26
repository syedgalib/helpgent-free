import { combineReducers } from 'redux';
import tags from './tags/reducers';
import messages from './messages/reducers';

const rootReducers = combineReducers({
  tags,
  messages,
});
  
export default rootReducers;