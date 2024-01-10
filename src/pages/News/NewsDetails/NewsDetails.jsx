import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { newsSelector } from 'redux/news/selectors';
import { getNews } from 'redux/news/thunk';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import RichContent from 'components/RichContent/RichContent';
import Footer from 'components/Footer/Footer';
import Header from 'components/Header/Header';
import Loader from 'components/Loader/Loader';
import { backendURL } from 'constants/backendURL';
import background from 'images/background-3.svg';
import 'pages/News/NewsDetails/NewsDetails.css';

export default function NewsDetails() {
  const [currentNews, setCurrentNews] = useState(null);
  const news = useSelector(newsSelector);
  const dispatch = useDispatch();
  const { newsId } = useParams();
  const { push, replace } = useHistory();

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
        setCurrentNews(currentNewsObj[0].attributes);
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
                  <img src={`${backendURL}${currentNews.cover.data.attributes.url}`} alt='news cover' className='news-cover' />
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
                  {news
                    .filter((news) => Number(news.id) !== Number(newsId))
                    .slice(0, 5)
                    .map(
                      ({
                        id,
                        attributes: {
                          title,
                          cover: {
                            data: {
                              attributes: { url },
                            },
                          },
                        },
                      }) => (
                        <div
                          className='recommended-news-card'
                          key={id}
                          onClick={() => {
                            push(`/news/${id}`);
                          }}
                        >
                          <img src={`${backendURL}${url}`} alt='' className='recommended-news-photo' />
                          <p className='text-s'>{title}</p>
                          <div className='news-data-wrapper text-xs'>
                            <span>{formatDateToLocalFormat(currentNews.publishedAt)}</span>
                            <span className='views'>{currentNews.views}</span>
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
