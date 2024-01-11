import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { newsSelector } from 'redux/news/selectors';
import { getNews, increaseNewsViews } from 'redux/news/thunk';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import RichContent from 'components/RichContent/RichContent';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import { backendURL } from 'constants/backendURL';
import placeholder from 'icons/image-placeholder.svg';
import background from 'images/background-3.svg';
import 'pages/News/NewsDetails/NewsDetails.css';

export default function NewsDetails() {
  const [viewsIncreased, setViewsIncreased] = useState(false);
  const [recommendedNews, setRecommendedNews] = useState([]);
  const [currentNews, setCurrentNews] = useState(null);
  const news = useSelector(newsSelector);
  const { push, replace } = useHistory();
  const dispatch = useDispatch();
  const { newsId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (news.length === 0) {
      dispatch(getNews());
    }
  }, []);

  useEffect(() => {
    if (news.length > 0) {
      window.scrollTo(0, 0);

      const currentNewsObj = news.find((currentNews) => Number(currentNews.id) === Number(newsId));

      if (currentNewsObj?.attributes) {
        const { id, attributes } = currentNewsObj;
        setCurrentNews(attributes);

        const otherNews = news.filter((newsItem) => Number(newsItem.id) !== Number(id));

        setRecommendedNews(otherNews.slice(0, 5));
      } else {
        replace('/not-found');
      }
    }
  }, [news, newsId]);

  useEffect(() => {
    if (currentNews && !viewsIncreased) {
      dispatch(increaseNewsViews(newsId, currentNews));
      setViewsIncreased(true);
    }
  }, [currentNews]);

  useEffect(() => {
    setViewsIncreased(false);
  }, [newsId]);

  return (
    <>
      <Header />
      <div className='detail-page-background'>
        <img src={background} alt='background' className='details-background-image' />
        <div className='container'>
          <div className='detail-page'>
            {currentNews ? (
              <>
                <div className='news-details'>
                  {currentNews?.cover?.data?.attributes && (
                    <img src={`${backendURL}${currentNews.cover.data.attributes.url}`} alt='news cover' className='news-cover' />
                  )}
                  {currentNews.cover_description && <p className='img-description text-s'>{currentNews.cover_description}</p>}
                  <div className='news-data-wrapper text-xs'>
                    <span>{formatDateToLocalFormat(currentNews.publishedAt)}</span>
                    <span className='views'>{currentNews.views}</span>
                  </div>
                  <h1 className='title-l'>{currentNews.title}</h1>
                  <div className='news-content'>
                    <RichContent content={currentNews.text} />
                  </div>
                </div>
                <div className='recommended-news'>
                  {recommendedNews.map(
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
                        className='recommended-news-card'
                        key={id}
                        onClick={() => {
                          push(`/news/${id}`);
                        }}
                      >
                        {data?.attributes ? (
                          <img src={`${backendURL}${data.attributes.url}`} alt='' className='recommended-news-photo' />
                        ) : (
                          <div className='image-placeholder'>
                            <img src={placeholder} alt='placeholder' />
                          </div>
                        )}
                        <p className='text-s'>{title}</p>
                        <div className='news-data-wrapper text-xs'>
                          <span>{formatDateToLocalFormat(publishedAt)}</span>
                          <span className='views'>{views}</span>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
