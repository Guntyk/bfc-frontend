import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useId, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { surveysSelector } from 'redux/surveys/selectors';
import { getSurveys } from 'redux/surveys/thunk';
import { getContactsFetch } from 'api/requests';
import { formatPhoneNumber } from 'helpers/formatPhoneNumber';
import Loader from 'components/Loader/Loader';
import { links } from 'constants/links';
import logo from 'icons/logo.svg';
import 'components/Footer/Footer.css';

export default function Footer() {
  const surveys = useSelector(surveysSelector);
  const [contacts, setContacts] = useState({});
  const dispatch = useDispatch();
  const { push } = useHistory();
  const id = useId();

  useEffect(() => {
    if (Object.keys(contacts).length === 0) {
      getContactsFetch().then(([getErr, contacts]) => {
        if (contacts) {
          setContacts(contacts.data.attributes);
        } else {
          push('/error');
          console.log(getErr);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (surveys.length === 0) {
      dispatch(getSurveys());
    }
  }, []);

  return (
    <div className='container'>
      <footer className='footer'>
        <div className='navigation-links'>
          <a className='logo' href='/'>
            <img src={logo} alt='Logo' />
          </a>
          <nav>
            <ul>
              {surveys.length > 0
                ? links.map(({ id, name, link, rounded }) => (
                    <li className={`nav-link text-s ${rounded ? 'rounded' : ''}`} key={id}>
                      <a href={link}>{name}</a>
                    </li>
                  ))
                : links
                    .filter((link) => link.id !== 3)
                    .map(({ id, name, link }) => (
                      <li className='nav-link text-s' key={id}>
                        <a href={link}>{name}</a>
                      </li>
                    ))}
              <li className='nav-link text-s'>
                <Link to='/news'>Архів новин</Link>
              </li>
              <li className='nav-link text-s'>
                <a href='https://bento.me/sate' target='_blank' rel='noreferrer noopener'>
                  Sate: {window.innerWidth <= 768 ? 'Web Dev' : 'Design & Development'}
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <button
          className='scroll-up-btn'
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
        >
          <div className='arrow' />
        </button>
        {Object.keys(contacts).length > 0 ? (
          <div className='contacts'>
            {Object.entries(contacts).map(([contact, value], index) => {
              if (contact === 'phone') {
                return (
                  <div className='contact phone' key={`${id}-${index}`}>
                    <span className='title'>Номер телефону</span>
                    <a className='title-l underline' href={`tel:${value}`} rel='noreferrer noopener'>
                      {formatPhoneNumber(value)}
                    </a>
                  </div>
                );
              } else if (contact === 'email') {
                return (
                  <div className='contact email' key={`${id}-${index}`}>
                    <span className='title'>Електронна пошта</span>
                    <a className='title-l underline' href={`mailto:${value}`} target='_blank' rel='noreferrer noopener'>
                      {value}
                    </a>
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <Loader />
        )}
      </footer>
    </div>
  );
}
