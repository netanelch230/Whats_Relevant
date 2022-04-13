import {SET_LOGGED_IN} from '../actions/login';
import fetchStates from './fetchStates';
import {ACCOUNT} from '../actions/types';
const initialState = {
  loggedIn: false,
};

function login(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {...state, loggedIn: true};
    case ACCOUNT.LOG_IN_FETCH:
      console.log('fetch logedIn IN PROGRESS');
      return {
        ...state,
        status: fetchStates.fetching,
      };
    case ACCOUNT.LOG_IN_SUCCESS:
      console.log('fetch logedIn SUCCESS');
      return {
        ...state,
        loggedIn: true,
        status: fetchStates.success,
        message: action.message,
      };
    case ACCOUNT.LOG_IN_FAILD:
      console.log('fetch logedIn FAILD');
      return {
        ...state,
        status: fetchStates.error,
        message: action.message,
      };

    default:
      return state;
  }
}

export default login;
