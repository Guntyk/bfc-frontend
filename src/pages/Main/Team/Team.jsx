import { team } from 'constants/team';
import 'pages/Main/Team/Team.css';

export default function Team() {
  return (
    <section className='team' id='team'>
      <h2 className='title underline'>Команда</h2>
      <ul className='team-list'>
        {team.map(({ id, attributes: { name, surname, fathername, role, photo } }) => (
          <li className='person-card' key={id}>
            <p className='text-xs role'>{role}</p>
            <p className='text name'>{`${surname} ${name} ${fathername}`}</p>
            <img src={`http://localhost:1337${photo.data.attributes.url}`} alt='person' />
          </li>
        ))}
      </ul>
    </section>
  );
}
