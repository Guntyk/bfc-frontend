import { GET_NEWS, SET_ERROR } from './actionTypes';

const defaultState = [];

export function newsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_NEWS:
      return [...action.newsArr];
    case SET_ERROR:
      return ['error'];
    default:
      return state;
  }
}
