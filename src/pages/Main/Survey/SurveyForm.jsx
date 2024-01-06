import { useEffect, useState } from 'react';
import Paragraph from 'components/RichContent/Types/Paragraph';

export default function SurveyForm({ id, yes_no_options, options }) {
  const [confirmedOption, setConfirmedOption] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [error, setError] = useState(false);

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
        {yes_no_options ? (
          <>
            <button
              className={selectedOption === 'Так, підтримую' ? 'active' : ''}
              onClick={() => {
                setSelectedOption('Так, підтримую');
              }}
            >
              Так, підтримую
            </button>
            <button
              className={selectedOption === 'Ні, не підтримую' ? 'active' : ''}
              onClick={() => {
                setSelectedOption('Ні, не підтримую');
              }}
            >
              Ні, не підтримую
            </button>
          </>
        ) : (
          options.map(({ children }) => {
            return (
              <button
                className={selectedOption === children[0].text ? 'active' : ''}
                key={children[0].text}
                onClick={() => {
                  setSelectedOption(children[0].text);
                }}
              >
                <Paragraph children={children} />
              </button>
            );
          })
        )}
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
