import { getNewsFetch, increaseNewsViewsFetch } from 'api/requests';
import { getNewsAction, increaseViewsAction, setErrorAction } from 'redux/news/actionCreators';

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

export function increaseNewsViews(id, { views }) {
  return (dispatch) => {
    increaseNewsViewsFetch(id, Number(views) + 1).then(([increaseErr, updatedNewsObj]) => {
      if (updatedNewsObj) {
        dispatch(increaseViewsAction(updatedNewsObj?.data));
      } else {
        dispatch(setErrorAction());
        console.log(increaseErr);
      }
    });
  };
}
