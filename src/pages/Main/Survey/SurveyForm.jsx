import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { vote } from 'redux/surveys/thunk';

export default function SurveyForm({ id, surveys, answers }) {
  const [confirmedOption, setConfirmedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSurvey, setCurrentSurvey] = useState(null);
  const [votesAmount, setVotesAmount] = useState(0);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (selectedOption) {
      setConfirmedOption(selectedOption);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    if (confirmedOption) {
      setVotesAmount(currentSurvey.attributes.answers.reduce((total, answer) => total + answer.responses, 0) + 1);
      const {
        attributes: { answers },
      } = currentSurvey;

      const answerToVote = answers.find((answer) => answer.id === confirmedOption);

      dispatch(vote(currentSurvey.id, answerToVote, answers));
    }

    //! confirmedOption && window.localStorage.setItem(`survey ${id}`, confirmedOption);
  }, [confirmedOption]);

  useEffect(() => {
    const previousAnswer = window.localStorage.getItem(`survey ${id}`);
    previousAnswer && setConfirmedOption(previousAnswer);

    setCurrentSurvey(surveys.find((survey) => survey.id === id));
  }, []);

  return (
    <form className='survey-form' onSubmit={handleSubmit}>
      <span className='title-s choose-option-title'>Оберіть відповідь</span>
      <div className={`options ${confirmedOption ? 'voted' : ''}`}>
        {answers.map(({ id, text, responses }) => (
          <div className='option' key={id}>
            <div className='progress-bar' style={{ width: `${Math.round((responses / votesAmount) * 100)}%` }} />
            <input
              id={id}
              type='radio'
              name='vote'
              className={`option-btn ${selectedOption === id ? 'active' : ''}`}
              onClick={() => {
                setSelectedOption(id);
              }}
            />
            <label htmlFor={id}>
              {text}
              <span className='percentage'>{confirmedOption && <span>{Math.round((responses / votesAmount) * 100)}%</span>}</span>
            </label>
          </div>
        ))}
      </div>
      {error && <p className='error text-xs'>Ви не обрали жодної відповіді</p>}
      <button className='gray-btn' type='submit' disabled={confirmedOption}>
        {confirmedOption ? 'Дякуємо за відповідь' : 'Я підтверджую свій вибір'}
      </button>
    </form>
  );
}
