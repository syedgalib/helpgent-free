import { combineReducers } from 'redux';
import form from './form/reducers';
import changeLayout from './layoutModes/reducers';

const rootReducers = combineReducers({
    form,
    changeLayout
});
  
export default rootReducers;