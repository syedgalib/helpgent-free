import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument())));

export default store;