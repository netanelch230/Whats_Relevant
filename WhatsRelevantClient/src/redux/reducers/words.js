import {
  ADD_WORD_ARR,
  REMOVE_WORD_ARR,
  ADD_WORD,
  REMOVE_WORD,
} from '../actions/words';

const initialState = {
  word: '',
  wordItems: [],
  loggedIn: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_WORD_ARR:
      return {
        ...state,
        wordItems: action.payload,
      };
    case REMOVE_WORD_ARR:
      return {
        ...state,
        wordItems: [
          ...state.wordItems.slice(0, action.payload),
          ...state.wordItems.slice(action.payload + 1),
        ],
      };
    case ADD_WORD:
      return {...state, word: action.payload};
    case REMOVE_WORD:
      return {...state, word: ''};

    default:
      return state;
  }
}

export default userReducer;
