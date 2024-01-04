import photo1 from 'images/photo1.png';
import photo2 from 'images/photo2.png';
import 'pages/Main/Team/Team.css';

export default function Team() {
  const people = [
    {
      id: 1,
      name: 'Марія ',
      surname: 'Шевченко ',
      fathername: 'Юріївна',
      role: 'Голова відділення',
      photo: photo1,
    },
    {
      id: 2,
      name: 'Анатолій ',
      surname: 'Овраменко ',
      fathername: 'Ігорович',
      role: 'Юрист',
      photo: photo2,
    },
    {
      id: 1,
      name: 'Марія ',
      surname: 'Шевченко ',
      fathername: 'Юріївна',
      role: 'Голова відділення',
      photo: photo1,
    },
    {
      id: 2,
      name: 'Анатолій ',
      surname: 'Овраменко ',
      fathername: 'Ігорович',
      role: 'Юрист',
      photo: photo2,
    },
    {
      id: 1,
      name: 'Марія ',
      surname: 'Шевченко ',
      fathername: 'Юріївна',
      role: 'Голова відділення',
      photo: photo1,
    },
    {
      id: 2,
      name: 'Анатолій ',
      surname: 'Овраменко ',
      fathername: 'Ігорович',
      role: 'Юрист',
      photo: photo2,
    },
    {
      id: 1,
      name: 'Марія ',
      surname: 'Шевченко ',
      fathername: 'Юріївна',
      role: 'Голова відділення',
      photo: photo1,
    },
    {
      id: 2,
      name: 'Анатолій ',
      surname: 'Овраменко ',
      fathername: 'Ігорович',
      role: 'Юрист',
      photo: photo2,
    },
    {
      id: 1,
      name: 'Марія ',
      surname: 'Шевченко ',
      fathername: 'Юріївна',
      role: 'Голова відділення',
      photo: photo1,
    },
    {
      id: 2,
      name: 'Анатолій ',
      surname: 'Овраменко ',
      fathername: 'Ігорович',
      role: 'Юрист',
      photo: photo2,
    },
  ];

  return (
    <section className='team' id='team'>
      <h2 className='title underline'>Команда</h2>
      <ul className='team-list'>
        {people.map(({ id, name, surname, fathername, role, photo }) => (
          <li className='person-card' key={id}>
            <p className='text-xs role'>{role}</p>
            <p className='text name'>{`${surname} ${name} ${fathername}`}</p>
            <img src={photo} alt='person' />
            <button className='contacts-btn text-s'>Контакти</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
