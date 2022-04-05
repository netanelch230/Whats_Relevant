import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import wordsReducer from './reducers/words';
import loginReducer from './reducers/login';
import messageReducer from './reducers/messages';
import groupReducer from './reducers/group';
import participantsReducer from './reducers/participants';

const rootReducer = combineReducers({
  wordsReducer,
  loginReducer,
  messageReducer,
  groupReducer,
  participantsReducer
});

export const Store = createStore(rootReducer, applyMiddleware(thunk));
