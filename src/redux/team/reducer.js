import { GET_TEAM, SET_ERROR } from './actionTypes';

const defaultState = [];

export function teamReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_TEAM:
      return [...action.teamArr];
    case SET_ERROR:
      return ['error'];
    default:
      return state;
  }
}
