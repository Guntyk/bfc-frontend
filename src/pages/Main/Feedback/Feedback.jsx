import { useId } from 'react';
import { formatPhoneNumber } from 'helpers/formatPhoneNumber';
import FeedbackForm from 'pages/Main/Feedback/FeedbackForm';
import { contacts } from 'constants/contacts';
import 'pages/Main/Feedback/Feedback.css';

export default function Feedback() {
  const id = useId();

  return (
    <section className='feedback'>
      <h2 className='title underline'>Зворотній зв’язок</h2>
      <div className='feedback-wrapper'>
        <div>
          <h3 className='title-xl feedback-title' id='contacts'>
            Контакти
          </h3>
          <div className='contacts'>
            {Object.entries(contacts).map(([contact, value], index) => {
              if (contact === 'phone') {
                return (
                  <div className='contact phone' key={`${id}-${index}`}>
                    <span className='title'>Номер телефону</span>
                    <a className='title-l underline' href={`tel:${value}`} rel='noreferrer noopener'>
                      {formatPhoneNumber(value)}
                    </a>
                  </div>
                );
              } else if (contact === 'email') {
                return (
                  <div className='contact email' key={`${id}-${index}`}>
                    <span className='title'>Електронна пошта</span>
                    <a className='title-l underline' href={`mailto:${value}`} target='_blank' rel='noreferrer noopener'>
                      {value}
                    </a>
                  </div>
                );
              } else {
                return <p>Контактів немає</p>;
              }
            })}
          </div>
        </div>
        <div>
          <h3 className='title-xl feedback-title'>Зв'язок</h3>
          <FeedbackForm />
        </div>
      </div>
    </section>
  );
}
