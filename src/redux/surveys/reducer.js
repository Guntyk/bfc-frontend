import { GET_SURVEYS, VOTE, SET_ERROR } from './actionTypes';

const defaultState = [];

export function surveysReducer(state = defaultState, action) {
  switch (action.type) {
    case GET_SURVEYS:
      return [...action.surveysArr];
    case VOTE:
      const surveyIndex = state.findIndex((survey) => survey.id === action.updatedSurvey.id);

      if (surveyIndex !== -1) {
        return [...state.slice(0, surveyIndex), action.updatedSurvey, ...state.slice(surveyIndex + 1)];
      } else {
        return state;
      }
    case SET_ERROR:
      return ['error'];
    default:
      return state;
  }
}
