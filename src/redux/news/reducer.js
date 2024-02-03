import { GET_NEWS, INCREASE_VIEWS, SET_ERROR } from './actionTypes';

const defaultState = [];

export function newsReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_NEWS:
      return action.newsArr;
    case INCREASE_VIEWS:
      const { updatedNewsObj } = action;

      return state.map((news) => (news.id === updatedNewsObj[0].id ? updatedNewsObj[0] : news));
    case SET_ERROR:
      return ['error'];
    default:
      return state;
  }
}
