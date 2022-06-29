import { combineReducers } from 'redux';
import video from './video/reducers';
import chatBox from './chatBox/reducers';
import chatboxTemplate from './chatboxTemplate/reducer';

const rootReducers = combineReducers({
  video,
  chatBox,
  chatboxTemplate,
});
  
export default rootReducers;