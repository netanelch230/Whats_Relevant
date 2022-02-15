export const ADD_WORD_ARR = 'ADD_WORD_ARR';
export const ADD_WORD = 'ADD_WORD';
export const REMOVE_WORD='REMOVE_WORD'
export const SET_LOGGED_IN='SET_LOGGED_IN'

export const REMOVE_WORD_ARR = 'REMOVE_WORD_ARR';

export const setWord = word => dispatch => {
    dispatch({
        type: ADD_WORD,
        payload: word,
    });
};
export const removeWord = () => dispatch => {
    dispatch({
        type: REMOVE_WORD,
        
    });
};

export const setWordArr = word => dispatch => {
    dispatch({
        type: ADD_WORD_ARR,
        payload: word,
    });
};

export const removeWordArr = index => dispatch => {
    dispatch({
        type: REMOVE_WORD_ARR,
        payload:index,
    });
};
