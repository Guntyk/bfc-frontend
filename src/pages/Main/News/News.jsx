import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { newsSelector } from 'redux/news/selectors';
import { getNews } from 'redux/news/thunk';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import Loader from 'components/Loader/Loader';
import { backendURL } from 'constants/backendURL';
import 'pages/Main/News/News.css';

export default function News() {
  const news = useSelector(newsSelector);
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (news.length === 0) {
      dispatch(getNews());
    }
  }, []);

  return (
    <div className='news' id='news'>
      <div className='container'>
        <h2 className='title underline'>Останні новини</h2>
      </div>
      {news[0] !== 'error' ? (
        news.length > 0 ? (
          <ul className='news-list'>
            {news.slice(0, 5).map(
              ({
                id,
                attributes: {
                  title,
                  views,
                  publishedAt,
                  cover: {
                    data: {
                      attributes: { url },
                    },
                  },
                },
              }) => (
                <li
                  className='news-card'
                  onClick={() => {
                    push(`/news/${id}`);
                  }}
                  key={id}
                >
                  <div className='news-data-wrapper text-xs'>
                    <span>{formatDateToLocalFormat(publishedAt)}</span>
                    <span className='views'>{views}</span>
                  </div>
                  <img src={`${backendURL}${url}`} alt='news cover' />
                  <p className='text'>{title}</p>
                </li>
              ),
            )}
          </ul>
        ) : (
          <Loader />
        )
      ) : (
        <Redirect to='/error' />
      )}
      {news.length > 5 && (
        <button
          className='more-news blue-btn'
          onClick={() => {
            push('/news');
          }}
        >
          Більше новин
        </button>
      )}
    </div>
  );
}
