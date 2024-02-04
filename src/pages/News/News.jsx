import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { newsSelector } from 'redux/news/selectors';
import { getNews } from 'redux/news/thunk';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import Loader from 'components/Loader/Loader';
import { backendURL } from 'constants/backendURL';
import background from 'images/background-3.svg';
import placeholder from 'icons/image-placeholder.svg';
import 'pages/News/News.css';

export default function News() {
  const [showLoader, setShowLoader] = useState(true);
  const [newsAmount, setNewsAmount] = useState(10);
  const news = useSelector(newsSelector);
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (news.length === 0) {
      dispatch(getNews());
    }

    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='news-archive-background'>
      <img src={background} alt='background' className='news-archive-background-image' />
      <div className='container'>
        <div className='news-archive'>
          <h1 className='title underline archive-title'>Архів новин</h1>
          {news[0] !== 'error' ? (
            news.length > 0 ? (
              <>
                <div className='news-archive-items'>
                  {news.slice(0, newsAmount).map(
                    ({
                      id,
                      attributes: {
                        title,
                        views,
                        publishedAt,
                        cover: { data },
                      },
                    }) => (
                      <div
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
                        {data?.attributes ? (
                          <img src={`${backendURL}${data.attributes.url}`} alt='news cover' />
                        ) : (
                          <div className='image-placeholder'>
                            <img src={placeholder} alt='placeholder' />
                          </div>
                        )}
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
            ) : showLoader ? (
              <Loader />
            ) : (
              <p className='no-news'>На жаль, новин немає 😔</p>
            )
          ) : (
            <Redirect to='/error' />
          )}
        </div>
      </div>
    </div>
  );
}
