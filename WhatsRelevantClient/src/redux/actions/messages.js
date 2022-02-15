export const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (message) => (dispatch) => {
  dispatch({
    type: ADD_MESSAGE,
    payload: message,
  });
};
