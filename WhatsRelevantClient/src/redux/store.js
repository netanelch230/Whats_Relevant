import {applyMiddleware, combineReducers, createStore} from 'redux';

import thunk from 'redux-thunk';
import words from './reducers/words';
import login from './reducers/login';
import messageReducer from './reducers/messages';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootReducer = combineReducers({
  words,
  login,
  messageReducer,
});

const config = {
  key: 'rootReducer',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(config, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
