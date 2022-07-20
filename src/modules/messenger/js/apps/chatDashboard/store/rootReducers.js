import { combineReducers } from 'redux';
import tags from './tags/reducers';
import chatBox from './chatBox/reducers';

const rootReducers = combineReducers({
  tags,
  chatBox
});
  
export default rootReducers;