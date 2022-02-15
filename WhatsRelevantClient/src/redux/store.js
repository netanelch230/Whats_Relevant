import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import wordsReducer from './reducers/words';
import loginReducer from './reducers/login';
import messageReducer from './reducers/messages';

const rootReducer = combineReducers({
  wordsReducer,
  loginReducer,
  messageReducer,
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
