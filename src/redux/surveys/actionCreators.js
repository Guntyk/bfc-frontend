import { GET_SURVEYS, SET_ERROR } from './actionTypes';

export function getSurveysAction(surveysArr) {
  return { type: GET_SURVEYS, surveysArr };
}

export function setErrorAction() {
  return { type: SET_ERROR };
}
