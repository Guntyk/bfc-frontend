import { getNewsFetch } from 'api/requests';
import { getNewsAction } from 'redux/news/actionCreators';

export function getNews() {
  return (dispatch) => {
    getNewsFetch().then(([newsErr, news]) => {
      if (news) {
        dispatch(getNewsAction(news.data.reverse()));
      } else {
        console.log(newsErr);
        alert('Сталася помилка');
      }
    });
  };
}
