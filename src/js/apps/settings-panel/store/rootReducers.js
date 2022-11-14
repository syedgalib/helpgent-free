import { combineReducers } from 'redux';
import settings from './settings/reducers';
import changeLayout from './layoutModes/reducers';

const rootReducers = combineReducers({
  settings,
  changeLayout
});
  
export default rootReducers;