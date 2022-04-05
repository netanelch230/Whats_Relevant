export const ADD_PARTICIPANTS = 'ADD_PARTICIPANTS';

export const addparticipants = (participants) => (dispatch) => {
  dispatch({
    type: ADD_PARTICIPANTS,
    payload: participants,
  });
};
