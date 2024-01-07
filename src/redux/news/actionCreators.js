import { GET_NEWS } from './actionTypes';

export function getNewsAction(newsArr) {
  return { type: GET_NEWS, newsArr };
}
