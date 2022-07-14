import { addGroup, ADD_GROUP } from "../actions/group";

const initialState = {
  groups: [],
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GROUP:
      console.log(ADD_GROUP, ' : ', action.payload);
      return {
        ...state,
        groups:action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
