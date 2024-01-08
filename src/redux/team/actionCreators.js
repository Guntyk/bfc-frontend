import { GET_TEAM, SET_ERROR } from './actionTypes';

export function getTeamAction(teamArr) {
  return { type: GET_TEAM, teamArr };
}
export function setErrorAction() {
  return { type: SET_ERROR };
}
