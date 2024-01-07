import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { newsSelector } from 'redux/news/selectors';
import { getNews } from 'redux/news/thunk';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import 'pages/News/News.css';
import Loader from 'components/Loader/Loader';

export default function News() {
  const [newsAmount, setNewsAmount] = useState(10);
  const news = useSelector(newsSelector);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (news.length === 0) {
      dispatch(getNews());
    }
  }, []);

  return (
    <div className='container'>
      <div className='news-archive'>
        <h1 className='title underline archive-title'>Архів новин</h1>
        {news.length > 0 ? (
          <>
            <div className='news-archive-items'>
              {news.slice(0, newsAmount).map(
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
                  <div
                    className='news-card'
                    onClick={() => {
                      push(`/news/${id}`);
                    }}
                  >
                    <div className='news-data-wrapper text-xs'>
                      <span>{formatDateToLocalFormat(publishedAt)}</span>
                      <span className='views'>{views}</span>
                    </div>
                    <img src={`http://localhost:1337${url}`} alt='news cover' />
                    <p className='text'>{title}</p>
                  </div>
                ),
              )}
            </div>
            {news.length > newsAmount && (
              <button
                className='blue-btn more-archive-news'
                onClick={() => {
                  setNewsAmount((newsAmount) => newsAmount + 10);
                }}
              >
                Показати більше
              </button>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
