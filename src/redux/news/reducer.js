import { GET_NEWS } from './actionTypes';

const defaultState = [];

export function newsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_NEWS:
      return [...action.newsArr];
    default:
      return state;
  }
}
