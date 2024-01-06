import { formatDateToLocalFormat } from 'helpers/formatDateToLocalFormat';
import { news } from 'constants/news';
import 'pages/News/News.css';
import { useState } from 'react';

export default function News() {
  const [newsAmount, setNewsAmount] = useState(1);

  return (
    <div className='container'>
      <div className='news-archive'>
        <h1 className='title underline archive-title'>Архів новин</h1>
        <div className='news-archive-items'>
          {news.slice(0, newsAmount).map(
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
              <div className='news-card'>
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
        <button
          className='blue-btn more-archive-news'
          onClick={() => {
            setNewsAmount((newsAmount) => newsAmount + 1);
          }}
        >
          Показати більше
        </button>
      </div>
    </div>
  );
}
