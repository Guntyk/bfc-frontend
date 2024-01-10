import { GET_NEWS, INCREASE_VIEWS, SET_ERROR } from './actionTypes';

export function getNewsAction(newsArr) {
  return { type: GET_NEWS, newsArr };
}

export function increaseViewsAction(updatedNewsObj) {
  return { type: INCREASE_VIEWS, updatedNewsObj };
}

export function setErrorAction() {
  return { type: SET_ERROR };
}
