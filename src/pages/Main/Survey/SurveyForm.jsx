import { useEffect, useId, useState } from 'react';
import { yesNoOptions } from 'constants/yesNoOptions';

export default function SurveyForm({ id, yes_no_options, answers }) {
  const [confirmedOption, setConfirmedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);
  const generatedId = useId();

  function handleClick() {
    if (selectedOption) {
      setConfirmedOption(selectedOption);
    } else {
      setError(true);
    }
  }

  useEffect(() => {
    confirmedOption && window.localStorage.setItem(`survey ${id}`, confirmedOption);
  }, [confirmedOption]);

  useEffect(() => {
    const previousAnswer = window.localStorage.getItem(`survey ${id}`);
    previousAnswer && setConfirmedOption(previousAnswer);
  }, []);

  return !confirmedOption ? (
    <div className='survey-form'>
      <span className='title-s choose-option-title'>Оберіть відповідь</span>
      <div className='options'>
        {yes_no_options
          ? yesNoOptions.map((answer, index) => (
              <button
                className={selectedOption === answer ? 'active' : ''}
                onClick={() => {
                  setSelectedOption(answer);
                }}
                key={`${generatedId}-${index}`}
              >
                {answer}
              </button>
            ))
          : answers.map(({ id, text }) => (
              <button
                className={selectedOption === text ? 'active' : ''}
                onClick={() => {
                  setSelectedOption(text);
                }}
                key={id}
              >
                {text}
              </button>
            ))}
      </div>
      {error && <p className='error text-xs'>Ви не обрали жодної відповіді</p>}
      <button className='gray-btn' onClick={handleClick}>
        Я підтверджую свій вибір
      </button>
    </div>
  ) : (
    <div className='thanks'>
      <span className='title-l underline'>Дякуємо!</span>
      <span className='text'>Ви віддали свій голос</span>
    </div>
  );
}
