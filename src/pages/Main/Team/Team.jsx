import { useState } from 'react';
import RichContent from 'components/RichContent/RichContent';
import { team } from 'constants/team';
import 'pages/Main/Team/Team.css';
import Modal from 'components/Modal/Modal';

export default function Team() {
  const [isModalOpen, setOpenModalId] = useState(false);

  function handleClick(id) {
    if (window.innerWidth < 768) {
      setOpenModalId(id);
    }
  }

  return (
    <section className='team' id='team'>
      <div className='container'>
        <h2 className='title underline'>Команда</h2>
      </div>
      <ul className='team-list'>
        {team.map(({ id, attributes: { name, surname, fathername, role, photo, description } }) => (
          <>
            <li
              className='person-card'
              key={id}
              onClick={() => {
                handleClick(id);
              }}
            >
              <div className='person-bio'>
                {window.innerWidth >= 768 && (
                  <>
                    <button
                      onClick={() => {
                        setOpenModalId(id);
                      }}
                    >
                      Читати біографію
                    </button>
                    <div className='person-description text-s'>
                      <div className='content-wrapper'>
                        <RichContent content={description} />
                      </div>
                    </div>
                  </>
                )}
                <p className='text-xs role'>{role}</p>
                <p className='text name'>{`${surname} ${name} ${fathername}`}</p>
              </div>
              <img src={`http://localhost:1337${photo.data.attributes.url}`} alt='person' />
            </li>
            <Modal id={id} title={`${surname} ${name} ${fathername}`} isActive={isModalOpen} setIsActive={setOpenModalId} content={description} />
          </>
        ))}
      </ul>
    </section>
  );
}
