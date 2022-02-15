import {SET_LOGGED_IN} from '../actions/login';

const initialState = {
  loggedIn: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOGGED_IN:
      return {...state, loggedIn: true};

    default:
      return state;
  }
}

export default userReducer;
