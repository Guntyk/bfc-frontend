import { GET_SURVEYS, VOTE, SET_ERROR } from './actionTypes';

export function getSurveysAction(surveysArr) {
  return { type: GET_SURVEYS, surveysArr };
}

export function voteAction(updatedSurvey) {
  return { type: VOTE, updatedSurvey };
}

export function setErrorAction() {
  return { type: SET_ERROR };
}
