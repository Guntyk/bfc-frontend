import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFirstBlockFetch } from 'api/requests';
import Loader from 'components/Loader/Loader';
import { backendURL } from 'constants/backendURL';
import 'pages/Main/Hero/Hero.css';

export default function Hero() {
  const [content, setContent] = useState(null);
  const { push } = useHistory();

  useEffect(() => {
    if (!content) {
      getFirstBlockFetch().then(([getErr, content]) => {
        if (content) {
          console.log(content.data.attributes);
          setContent(content.data.attributes);
        } else {
          push('/error');
          console.log(getErr);
        }
      });
    }
  }, []);

  const splitActivities = (activity) => activity.split('+').map((item) => item.trim());

  if (content) {
    const {
      name,
      description,
      activities,
      background: {
        data: {
          attributes: { url },
        },
      },
    } = content;

    return (
      <section className='hero' style={{ background: `url(${backendURL}${url}) no-repeat 50% / cover` }}>
        <h1 className='title-xl'>{name}</h1>
        <p className='text-l'>{description}</p>
        <ul className='activities'>
          {splitActivities(activities).map((activity) => (
            <li className='activity text-xs' key={activity}>
              {activity}
            </li>
          ))}
        </ul>
      </section>
    );
  } else {
    return <Loader />;
  }
}
