import { useEffect, useId, useState } from 'react';
import Paragraph from 'components/RichContent/Types/Paragraph';
import { yesNoOptions } from 'constants/yesNoOptions';

export default function SurveyForm({ id, yes_no_options, options }) {
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
          ? yesNoOptions.map((option, index) => (
              <button
                className={selectedOption === option ? 'active' : ''}
                onClick={() => {
                  setSelectedOption(option);
                }}
                key={`${generatedId}-${index}`}
              >
                {option}
              </button>
            ))
          : options.map(({ children }, index) => {
              return (
                <button
                  className={selectedOption === children[0].text ? 'active' : ''}
                  onClick={() => {
                    setSelectedOption(children[0].text);
                  }}
                  key={`${generatedId}-${index}`}
                >
                  <Paragraph children={children} />
                </button>
              );
            })}
      </div>
      {error && <p className='error text-xs'>Ви не вибрали жодної відповіді</p>}
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
