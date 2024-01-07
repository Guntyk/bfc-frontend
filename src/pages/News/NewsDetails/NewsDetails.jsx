import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import RichContent from 'components/RichContent/RichContent';
import { news } from 'constants/news';
import 'pages/News/NewsDetails/NewsDetails.css';

export default function NewsDetails() {
  const [currentNews, setCurrentNews] = useState(null);
  const { newsId } = useParams();
  const { push } = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
    const currentNewsObj = news.filter((currentNews) => Number(currentNews.id) === Number(newsId) && currentNews.attributes);
    setCurrentNews(currentNewsObj[0].attributes);
  }, [newsId]);

  return (
    <div className='container'>
      {currentNews ? (
        <div className='detail-page'>
          <div className='news-details'>
            <img src={`http://localhost:1337${currentNews.cover.data.attributes.url}`} alt='news cover' className='news-cover' />
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
                    <img src={`http://localhost:1337${url}`} alt='' className='recommended-news-photo' />
                    <p className='text-s'>{title}</p>
                    <div className='news-data-wrapper text-xs'>
                      <span>{formatDateToLocalFormat(currentNews.publishedAt)}</span>
                      <span className='views'>{currentNews.views}</span>
                    </div>
                  </div>
                ),
              )}
          </div>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
}
