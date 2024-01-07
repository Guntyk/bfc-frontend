import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { newsReducer } from 'redux/news/reducer';
import { teamReducer } from 'redux/team/reducer';

const rootReducer = combineReducers({
  news: newsReducer,
  team: teamReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
