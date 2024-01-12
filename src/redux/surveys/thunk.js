import { getSurveysFetch, voteFetch } from 'api/requests';
import { getSurveysAction, setErrorAction, voteAction } from 'redux/surveys/actionCreators';

export function getSurveys() {
  return (dispatch) => {
    getSurveysFetch().then(([surveysErr, surveys]) => {
      if (surveys) {
        dispatch(getSurveysAction(surveys.data.reverse()));
      } else {
        dispatch(setErrorAction());
        console.log(surveysErr);
      }
    });
  };
}

export function vote(surveyId, answerToVote, answers) {
  const otherAnswers = answers.filter((answer) => answer !== answerToVote);

  return (dispatch) => {
    voteFetch(surveyId, answerToVote, otherAnswers).then(([voteErr, updatedSurvey]) => {
      if (updatedSurvey) {
        dispatch(voteAction(updatedSurvey?.data));
      } else {
        dispatch(setErrorAction());
        console.log(voteErr);
      }
    });
  };
}
