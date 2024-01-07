import { getTeamFetch } from 'api/requests';
import { getTeamAction } from 'redux/team/actionCreators';

export function getTeam() {
  return (dispatch) => {
    getTeamFetch().then(([teamErr, team]) => {
      if (team) {
        dispatch(getTeamAction(team.data));
      } else {
        console.log(teamErr);
        alert('Сталася помилка');
      }
    });
  };
}
