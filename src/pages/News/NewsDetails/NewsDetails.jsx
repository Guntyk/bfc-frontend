import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { newsSelector } from 'redux/news/selectors';
import { getNews } from 'redux/news/thunk';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import { increaseNewsViewsFetch } from 'api/requests';
import RichContent from 'components/RichContent/RichContent';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import { backendURL } from 'constants/backendURL';
import background from 'images/background-3.svg';
import 'pages/News/NewsDetails/NewsDetails.css';

export default function NewsDetails() {
  const [recommendedNews, setRecommendedNews] = useState([]);
  const [currentNews, setCurrentNews] = useState(null);
  const [newsViews, setNewsViews] = useState(0);
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
      const currentNewsObj = news.filter((currentNews) => Number(currentNews.id) === Number(newsId));

      if (currentNewsObj[0]?.attributes) {
        const { id, attributes } = currentNewsObj[0];
        const newViews = Number(attributes.views) + 1;

        setCurrentNews(attributes);
        setNewsViews(newViews);
        setRecommendedNews(news.filter((news) => Number(news.id) !== Number(id)).slice(0, 5));
        increaseNewsViewsFetch(id, newViews);
      } else {
        replace('/not-found');
      }
    }
  }, [news, newsId]);

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
                  {currentNews.cover.data?.attributes && (
                    <img src={`${backendURL}${currentNews.cover.data.attributes.url}`} alt='news cover' className='news-cover' />
                  )}
                  {currentNews.cover_description && <p className='img-description text-s'>{currentNews.cover_description}</p>}
                  <div className='news-data-wrapper text-xs'>
                    <span>{formatDateToLocalFormat(currentNews.publishedAt)}</span>
                    <span className='views'>{newsViews}</span>
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
                        {data?.attributes ? <img src={`${backendURL}${data.attributes.url}`} alt='' className='recommended-news-photo' /> : <hr />}
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
