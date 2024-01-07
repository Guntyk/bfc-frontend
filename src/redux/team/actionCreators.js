import { GET_TEAM } from './actionTypes';

export function getTeamAction(teamArr) {
  return { type: GET_TEAM, teamArr };
}
