import { getNewsFetch, increaseNewsViewsFetch } from 'api/requests';
import { getNewsAction, increaseViewsAction, setErrorAction } from 'redux/news/actionCreators';

function removeEmptyTextFromArray(news) {
  const filterText = (newsArr) =>
    newsArr.map((newsItem) => ({
      ...newsItem,
      attributes: {
        ...newsItem.attributes,
        text: newsItem.attributes.text
          .map((item) => ({
            ...item,
            children: item.type === 'paragraph' ? item.children.filter((child) => child.text !== '') : item.children,
          }))
          .filter(({ children }) => children && children.length > 0),
      },
    }));

  return Array.isArray(news) ? filterText(news) : filterText([news]);
}

export function getNews() {
  return (dispatch) => {
    getNewsFetch().then(([newsErr, news]) => {
      if (news) {
        console.log(removeEmptyTextFromArray(news.data));
        dispatch(getNewsAction(removeEmptyTextFromArray(news.data).reverse()));
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
        dispatch(increaseViewsAction(removeEmptyTextFromArray(updatedNewsObj?.data)));
      } else {
        dispatch(setErrorAction());
        console.log(increaseErr);
      }
    });
  };
}
