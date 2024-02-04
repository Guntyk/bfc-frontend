import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { vote as voteThunk } from 'redux/surveys/thunk';

export default function SurveyForm({ id, surveys }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentSurvey, setCurrentSurvey] = useState(null);
  const [voted, setVoted] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const survey = surveys.find((survey) => survey.id === id);
    if (survey) {
      setCurrentSurvey(survey);
    }

    const previousAnswer = window.localStorage.getItem(`survey ${id}`);
    if (previousAnswer) {
      setVoted(true);
      setSelectedOption(previousAnswer);
    }
  }, [id, surveys]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOption && currentSurvey) {
      setError(false);
      const {
        id,
        attributes: { answers },
      } = currentSurvey;
      const answerToVote = answers.find(({ id }) => id === selectedOption);

      if (!voted) {
        dispatch(voteThunk(id, answerToVote, answers));
        window.localStorage.setItem(`survey ${id}`, selectedOption);
        setVoted(true);
      }
    } else {
      setError(true);
    }
  };

  const calculatePercentages = () => {
    if (!currentSurvey || !currentSurvey.attributes || !currentSurvey.attributes.answers) {
      return {};
    }

    const { answers } = currentSurvey.attributes;
    const totalResponses = answers.reduce((total, { responses }) => total + responses, 0);
    let percentages = answers.map(({ id, responses }) => ({
      id,
      percentage: (responses / totalResponses) * 100,
    }));

    let roundedPercentages = percentages.map((answer) => ({
      ...answer,
      rounded: Math.round(answer.percentage),
      difference: answer.percentage - Math.round(answer.percentage),
    }));

    let totalRounded = roundedPercentages.reduce((total, { rounded }) => total + rounded, 0);
    let error = 100 - totalRounded;

    roundedPercentages
      .sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference))
      .forEach(({ rounded }, index) => {
        if (index < Math.abs(error)) {
          rounded += error > 0 ? 1 : -1;
        }
      });

    return roundedPercentages.reduce((acc, { id, rounded }) => ({ ...acc, [id]: rounded }), {});
  };

  const percentages = currentSurvey ? calculatePercentages() : {};

  return (
    <form className='survey-form' onSubmit={handleSubmit}>
      <span className='title-s choose-option-title'>Оберіть відповідь</span>
      {currentSurvey && currentSurvey.attributes && currentSurvey.attributes.answers && (
        <div className={`options ${voted ? 'voted' : ''}`}>
          {currentSurvey.attributes.answers.map(({ id, text }) => (
            <div className={`option ${selectedOption === String(id) ? 'voted' : ''}`} key={id}>
              <div className='progress-bar' style={{ width: `${percentages[id]}%` }}></div>
              <input
                id={id}
                type='radio'
                name='vote'
                className={`option-btn ${selectedOption === id ? 'active' : ''}`}
                onClick={() => setSelectedOption(id)}
                disabled={voted}
              />
              <label htmlFor={id}>
                <span className='percentage'>{voted && `${percentages[id]}%`}</span>
                <span className='label-text'>{text}</span>
              </label>
            </div>
          ))}
        </div>
      )}
      {error && <p className='error text-xs'>Ви не обрали жодної відповіді</p>}
      <button className='gray-btn' type='submit' disabled={voted || !selectedOption}>
        {voted ? 'Дякуємо за відповідь' : 'Я підтверджую свій вибір'}
      </button>
    </form>
  );
}
