import logo from 'icons/logo.svg';
import 'components/Header/Header.css';

export default function Header() {
  const links = [
    { id: 1, name: 'Команда', link: '#team' },
    { id: 2, name: 'Новини', link: '#news' },
    { id: 3, name: 'Опитування', link: '#survey' },
    { id: 4, name: 'Контакти', link: '#contacts' },
  ];

  return (
    <div className='container'>
      <header className='header'>
        <a className='logo' href='/'>
          <img src={logo} alt='Logo' />
        </a>
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
