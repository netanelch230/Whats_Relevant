export const ADD_GROUP = 'ADD_GROUP';

export const addGroup = (group) => (dispatch) => {
  dispatch({
    type: ADD_GROUP,
    payload: group,
  });
};
