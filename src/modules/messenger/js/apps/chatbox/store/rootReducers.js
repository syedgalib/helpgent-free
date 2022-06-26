import { combineReducers } from 'redux';
import video from './video/reducers';
import chatBox from './chatBox/reducers';

const rootReducers = combineReducers({
  video,
  chatBox
});
  
export default rootReducers;