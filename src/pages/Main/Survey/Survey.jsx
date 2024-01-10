import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { surveysSelector } from 'redux/surveys/selectors';
import { getSurveys } from 'redux/surveys/thunk';
import RichContent from 'components/RichContent/RichContent';
import Modal from 'components/Modal/Modal';
import SurveyForm from 'pages/Main/Survey/SurveyForm';
import 'pages/Main/Survey/Survey.css';

export default function Survey() {
  const [isModalOpen, setOpenModalId] = useState(false);
  const surveys = useSelector(surveysSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (surveys.length === 0) {
      dispatch(getSurveys());
    }
  }, []);

  return surveys.length > 0 ? (
    <section className='surveys'>
      <div className='container'>
        <h2 className='title underline'>Опитування</h2>
      </div>
      {surveys[0] !== 'error' ? (
        surveys.map(({ id, attributes: { yes_no_options, options, description } }) => {
          const textLength = description.flatMap((desc) => desc.children).reduce((totalLength, { text }) => totalLength + text.length, 0);

          return (
            <div className='survey-background' key={id}>
              <div className='container'>
                <div className='survey'>
                  <SurveyForm id={id} yes_no_options={yes_no_options} options={options} />
                  <div>
                    <div className='survey-content'>
                      <RichContent content={description} />
                    </div>
                    {textLength > 800 && (
                      <button
                        className='read-more-btn text-s'
                        onClick={() => {
                          setOpenModalId(id);
                        }}
                      >
                        Читати повністю
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <Modal id={id} isActive={isModalOpen} setIsActive={setOpenModalId} content={description} />
            </div>
          );
        })
      ) : (
        <Redirect to='/error' />
      )}
    </section>
  ) : (
    <></>
  );
}
