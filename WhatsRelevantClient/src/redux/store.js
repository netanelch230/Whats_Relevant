import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import words from './reducers/words';
import login from './reducers/login';
import messageReducer from './reducers/messages';

const rootReducer = combineReducers({
  words,
  login,
  messageReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
