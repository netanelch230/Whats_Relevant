export const SET_LOGGED_IN = 'SET_LOGGED_IN';
import {BACKEND} from '../../config';
import {ACCOUNT} from './types';
export const setLoggedIn = (index) => (dispatch) => {
  dispatch({
    type: SET_LOGGED_IN,
    payload: index,
  });
};

export const signup = ({userName, phoneNumber}) =>
  fetchFromServer({
    endpoint: '/account/signup',
    options: {
      method: 'POST',
      body: JSON.stringify({userName, phoneNumber}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    },
    FETCH_TYPE: ACCOUNT.LOG_IN_FETCH,
    ERROR_TYPE: ACCOUNT.LOG_IN_FAILD,
    SUCCESS_TYPE: ACCOUNT.LOG_IN_SUCCESS,
  });

export const fetchFromServer = ({
  endpoint,
  options,
  FETCH_TYPE,
  ERROR_TYPE,
  SUCCESS_TYPE,
}) => (dispatch) => {
  console.log('fetchFromAccount', `---${BACKEND.ADDRESS}${endpoint}`);
  dispatch({type: FETCH_TYPE});
  return fetch(`${BACKEND.ADDRESS}${endpoint}`, options)
    .then((response) => response.json())
    .then((json) => {
      if (json.type === 'error') {
        dispatch({type: ERROR_TYPE, message: json.message});
      } else {
        dispatch({type: SUCCESS_TYPE, message: json.message});
      }
    })
    .catch((error) => dispatch({type: ERROR_TYPE, message: error.message}));
};
