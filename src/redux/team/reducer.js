import { GET_TEAM } from './actionTypes';

const defaultState = [];

export function teamReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_TEAM:
      return [...action.teamArr];
    default:
      return state;
  }
}
