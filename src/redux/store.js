import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { newsReducer } from 'redux/news/reducer';

const rootReducer = combineReducers({
  news: newsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
