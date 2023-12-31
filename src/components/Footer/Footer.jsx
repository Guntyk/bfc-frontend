import { Link } from 'react-router-dom';
import { useId } from 'react';
import { formatPhoneNumber } from 'helpers/formatPhoneNumber';
import { contacts } from 'constants/contacts';
import { links } from 'constants/links';
import logo from 'icons/logo.svg';
import 'components/Footer/Footer.css';

export default function Footer() {
  const id = useId();

  return (
    <div className='container'>
      <footer className='footer'>
        <div className='navigation-links'>
          <a className='logo' href='/'>
            <img src={logo} alt='Logo' />
          </a>
          <nav>
            <ul>
              {links.map(({ id, name, link }) => (
                <li className='nav-link text-s' key={id}>
                  <a href={link}>{name}</a>
                </li>
              ))}
              <li className='nav-link text-s'>
                <Link to='/news'>Архів новин</Link>
              </li>
              <li className='nav-link text-s'>
                <a href='https://bento.me/sate' target='_blank' rel='noreferrer noopener'>
                  Sate: Design & Development
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
            } else {
              return <p>Контактів немає</p>;
            }
          })}
        </div>
      </footer>
    </div>
  );
}
