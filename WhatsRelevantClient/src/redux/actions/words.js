//import {fetchFromServer} from './login';
import { ACCOUNT_WORDS } from './types';
import {BACKEND} from '../../config';
export const ADD_WORD_ARR = 'ADD_WORD_ARR';
export const ADD_WORD = 'ADD_WORD';
export const REMOVE_WORD = 'REMOVE_WORD';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const REMOVE_WORD_ARR = 'REMOVE_WORD_ARR';

export const fetchWords = () =>
  fetchFromServer({
    endpoint: '/words/getWords',
    options: {
      method: 'GET',
      body: JSON.stringify({user: 'USER1'}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT_WORDS.FETCH,
    ERROR_TYPE: ACCOUNT_WORDS.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_WORDS.FETCH_SUCCESS,
  });
export const fetchRemoveWord = ({index}) =>
  fetchFromServer({
    endpoint: '/words/removeWords',
    options: {
      method: 'POST',
      body: JSON.stringify({index}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT_WORDS.FETCH,
    ERROR_TYPE: ACCOUNT_WORDS.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_WORDS.FETCH_SUCCESS,
  });
export const fetchAddWords = ({word}) =>
  fetchFromServer({
    endpoint: '/words/addWords',
    options: {
      method: 'POST',
      body: JSON.stringify({word}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT_WORDS.FETCH,
    ERROR_TYPE: ACCOUNT_WORDS.FETCH_ERROR,
    SUCCESS_TYPE: ACCOUNT_WORDS.FETCH_SUCCESS,
  });
export const fetchFromServer = ({
  endpoint,
  options,
  FETCH_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE,
}) => (dispatch) => {
  console.log('fetch ---> ', `${BACKEND.ADDRESS}${endpoint}`);
  dispatch({type: FETCH_TYPE});
  return fetch(`${BACKEND.ADDRESS}${endpoint}`, options)
    .then((response) => response.json())
    .then((json) => {
      if (json.type === 'error') {
        dispatch({type: ERROR_TYPE, message: json.message});
      } else {
        dispatch({type: SUCCESS_TYPE, ...json});
      }
    })
    .catch((error) => dispatch({type: ERROR_TYPE, message: error.message}));
};
//////////////////////////////////////////////////
export const setWord = (word) => (dispatch) => {
  dispatch({
    type: ADD_WORD,
    payload: word,
  });
};
export const removeWord = () => (dispatch) => {
  dispatch({
    type: REMOVE_WORD,
  });
};

export const setWordArr = (word) => (dispatch) => {
  dispatch({
    type: ADD_WORD_ARR,
    payload: word,
  });
};

export const removeWordArr = (index) => (dispatch) => {
  dispatch({
    type: REMOVE_WORD_ARR,
    payload: index,
  });
};
