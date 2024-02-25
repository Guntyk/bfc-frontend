import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { surveysReducer } from 'redux/surveys/reducer';
import { newsReducer } from 'redux/news/reducer';
import { teamReducer } from 'redux/team/reducer';

const rootReducer = combineReducers({
  surveys: surveysReducer,
  news: newsReducer,
  team: teamReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
