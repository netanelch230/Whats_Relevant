
import {addparticipants, ADD_PARTICIPANTS } from "../actions/participants";

const initialState = {
  participants: [],
};

function participantsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PARTICIPANTS:
      console.log(ADD_PARTICIPANTS, ' : ', action.payload);
      return {
        ...state,
        participants: action.payload,
      };
    default:
      return state;
  }
}

export default participantsReducer;
