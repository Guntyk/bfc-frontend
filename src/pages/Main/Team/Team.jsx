import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { teamSelector } from 'redux/team/selectors';
import { getTeam } from 'redux/team/thunk';
import RichContent from 'components/RichContent/RichContent';
import Loader from 'components/Loader/Loader';
import Modal from 'components/Modal/Modal';
import { backendURL } from 'constants/backendURL';
import 'pages/Main/Team/Team.css';

export default function Team() {
  const [isModalOpen, setOpenModalId] = useState(false);
  const team = useSelector(teamSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (team.length === 0) {
      dispatch(getTeam());
    }
  }, []);

  return (
    <div className='team-background'>
      <section className={`team ${team.length > 0 && window.innerWidth > 1280 ? 'fulfilled' : ''}`} id='team'>
        <div className='container'>
          <h2 className='title underline'>Команда</h2>
        </div>
        {team[0] !== 'error' ? (
          team.length > 0 ? (
            <ul className='team-list'>
              {team.map(({ id, attributes: { name, surname, fathername, role, photo, description } }) => (
                <li
                  className='person-card'
                  key={id}
                  onClick={() => {
                    if (window.innerWidth < 1281 && !isModalOpen) {
                      setOpenModalId(id);
                    }
                  }}
                >
                  <div className='person-bio'>
                    {window.innerWidth >= 1280 && (
                      <>
                        <button
                          className='gray-btn read-bio'
                          onClick={() => {
                            !isModalOpen && setOpenModalId(id);
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
                  <img src={`${backendURL}${photo.data.attributes.url}`} alt='person' />
                  <Modal
                    id={id}
                    title={`${surname} ${name} ${fathername}`}
                    isActive={isModalOpen}
                    setIsActive={setOpenModalId}
                    content={description}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <Loader />
          )
        ) : (
          <Redirect to='/error' />
        )}
      </section>
    </div>
  );
}
