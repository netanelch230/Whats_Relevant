import {ADD_MESSAGE} from '../actions/messages';

const initialState = {
  messages: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      console.log(ADD_MESSAGE, ' : ', action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
}

export default userReducer;
