import { getTeamFetch } from 'api/requests';
import { getTeamAction, setErrorAction } from 'redux/team/actionCreators';

export function getTeam() {
  return (dispatch) => {
    getTeamFetch().then(([teamErr, team]) => {
      if (team) {
        dispatch(getTeamAction(team.data));
      } else {
        dispatch(setErrorAction());
        console.log(teamErr);
      }
    });
  };
}
