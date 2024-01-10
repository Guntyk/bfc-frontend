import { GET_NEWS, INCREASE_VIEWS, SET_ERROR } from './actionTypes';

const defaultState = [];

export function newsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_NEWS:
      return [...action.newsArr];
    case INCREASE_VIEWS:
      const newsIndex = state.findIndex((news) => news.id === action.updatedNewsObj.id);

      if (newsIndex !== -1) {
        return [...state.slice(0, newsIndex), action.updatedNewsObj, ...state.slice(newsIndex + 1)];
      } else {
        return state;
      }
    case SET_ERROR:
      return ['error'];
    default:
      return state;
  }
}
