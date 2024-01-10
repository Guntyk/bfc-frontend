import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { formatPhoneNumber } from 'helpers/formatPhoneNumber';
import { surveysSelector } from 'redux/surveys/selectors';
import { getSurveys } from 'redux/surveys/thunk';
import { getContactsFetch } from 'api/requests';
import { links } from 'constants/links';
import logo from 'icons/logo.svg';
import 'components/Header/Header.css';
import Loader from 'components/Loader/Loader';

export default function Header() {
  const surveys = useSelector(surveysSelector);
  const [contacts, setContacts] = useState({});
  const dispatch = useDispatch();
  const { push } = useHistory();

  useEffect(() => {
    if (surveys.length === 0) {
      dispatch(getSurveys());
    }

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

  return (
    <div className='container'>
      <header className='header'>
        <Link className='logo' to='/'>
          <img src={logo} alt='Логотип' />
        </Link>
        <div className='navigation'>
          <nav>
            <ul className='nav-links'>
              {surveys.length > 0
                ? links.map(({ id, name, link, rounded }) => (
                    <li className={`nav-link ${rounded ? 'rounded' : ''}`} key={id}>
                      <a href={link}>{name}</a>
                    </li>
                  ))
                : links
                    .filter((link) => link.id !== 3)
                    .map(({ id, name, link }) => (
                      <li className='nav-link' key={id}>
                        <a href={link}>{name}</a>
                      </li>
                    ))}
            </ul>
          </nav>
          {contacts?.phone ? (
            <a href={`tel:${contacts.phone}`} className='contact-phone'>
              {formatPhoneNumber(contacts.phone)}
            </a>
          ) : (
            <Loader className='header-loader' />
          )}
        </div>
      </header>
    </div>
  );
}
