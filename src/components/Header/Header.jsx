import logo from 'icons/logo.svg';
import 'components/Header/Header.css';

export default function Header() {
  const links = [
    { name: 'Команда', link: '#team' },
    { name: 'Новини', link: '#news' },
    { name: 'Опитування', link: '#survey' },
    { name: 'Контакти', link: '#contacts' },
  ];

  return (
    <header className='header'>
      <a className='logo' href='/'>
        <img src={logo} alt='Logo' />
      </a>
      <div className='navigation'>
        <nav>
          <ul className='nav-links'>
            {links.map(({ name, link }) => (
              <li className='nav-link'>
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
  );
}
