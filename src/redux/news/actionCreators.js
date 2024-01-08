import { GET_NEWS, SET_ERROR } from './actionTypes';

export function getNewsAction(newsArr) {
  return { type: GET_NEWS, newsArr };
}

export function setErrorAction() {
  return { type: SET_ERROR };
}
