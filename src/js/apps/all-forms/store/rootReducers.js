import { combineReducers } from 'redux';
import changeLayout from './layoutModes/reducers';

const rootReducers = combineReducers({
    changeLayout
});
  
export default rootReducers;