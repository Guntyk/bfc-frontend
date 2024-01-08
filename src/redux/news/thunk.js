import { getNewsFetch } from 'api/requests';
import { getNewsAction, setErrorAction } from 'redux/news/actionCreators';

export function getNews() {
  return (dispatch) => {
    getNewsFetch().then(([newsErr, news]) => {
      if (news) {
        dispatch(getNewsAction(news.data.reverse()));
      } else {
        dispatch(setErrorAction());
        console.log(newsErr);
      }
    });
  };
}
