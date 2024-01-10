import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { surveysSelector } from 'redux/surveys/selectors';
import { getSurveys } from 'redux/surveys/thunk';
import { links } from 'constants/links';
import logo from 'icons/logo.svg';
import 'components/Header/Header.css';

export default function Header() {
  const surveys = useSelector(surveysSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (surveys.length === 0) {
      dispatch(getSurveys());
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
          <a href='tel:380960082206' className='contact-phone'>
            +380 (96) 008-22-06
          </a>
        </div>
      </header>
    </div>
  );
}
