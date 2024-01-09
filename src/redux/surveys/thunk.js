import { getSurveysFetch } from 'api/requests';
import { getSurveysAction, setErrorAction } from 'redux/surveys/actionCreators';

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
