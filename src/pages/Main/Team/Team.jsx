import RichContent from 'components/RichContent/RichContent';
import { team } from 'constants/team';
import 'pages/Main/Team/Team.css';

export default function Team() {
  return (
    <section className='team' id='team'>
      <div className='container'>
        <h2 className='title underline'>Команда</h2>
      </div>
      <ul className='team-list'>
        {team.map(({ id, attributes: { name, surname, fathername, role, photo, description } }) => (
          <li className='person-card' key={id}>
            <div className='person-bio'>
              {window.innerWidth >= 768 && (
                <>
                  <button>Читати біографію</button>
                  <div className='person-description text-s'>
                    <div className='content-wrapper'>
                      {description.map((descriptionObj) => (
                        <RichContent content={descriptionObj} />
                      ))}
                    </div>
                  </div>
                </>
              )}
              <p className='text-xs role'>{role}</p>
              <p className='text name'>{`${surname} ${name} ${fathername}`}</p>
            </div>
            <img src={`http://localhost:1337${photo.data.attributes.url}`} alt='person' />
          </li>
        ))}
      </ul>
    </section>
  );
}
