export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export const setLoggedIn = (index) => (dispatch) => {
  dispatch({
    type: SET_LOGGED_IN,
    payload: index,
  });
};
