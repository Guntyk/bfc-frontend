import { Link } from 'react-router-dom';
import { links } from 'constants/links';
import logo from 'icons/logo.svg';
import 'components/Header/Header.css';

export default function Header() {
  return (
    <div className='container'>
      <header className='header'>
        <Link className='logo' to='/'>
          <img src={logo} alt='Логотип' />
        </Link>
        <div className='navigation'>
          <nav>
            <ul className='nav-links'>
              {links.map(({ id, name, link }) => (
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
