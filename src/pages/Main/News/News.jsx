import { useHistory } from 'react-router-dom';
import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import { news } from 'constants/news';
import 'pages/Main/News/News.css';

export default function News() {
  const latestNews = news.slice(-5).reverse();
  const { push } = useHistory();

  return (
    <div className='news' id='news'>
      <div className='container'>
        <h2 className='title underline'>Останні новини</h2>
      </div>
      <ul className='news-list'>
        {latestNews.map(
          ({
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
            <li className='news-card'>
              <div className='news-data-wrapper text-xs'>
                <span>{formatDateToLocalFormat(publishedAt)}</span>
                <span className='views'>{views}</span>
              </div>
              <img src={`http://localhost:1337${url}`} alt='news cover' />
              <p className='text'>{title}</p>
            </li>
          ),
        )}
      </ul>
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
