import { GET_SURVEYS, SET_ERROR } from './actionTypes';

const defaultState = [];

export function surveysReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SURVEYS:
      return [...action.surveysArr];
    case SET_ERROR:
      return ['error'];
    default:
      return state;
  }
}
