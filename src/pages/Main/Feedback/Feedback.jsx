import { useEffect, useId, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getContactsFetch } from 'api/requests';
import { formatPhoneNumber } from 'helpers/formatPhoneNumber';
import FeedbackForm from 'pages/Main/Feedback/FeedbackForm';
import Loader from 'components/Loader/Loader';
import 'pages/Main/Feedback/Feedback.css';

export default function Feedback() {
  const [contacts, setContacts] = useState({});
  const { push } = useHistory();
  const id = useId();

  useEffect(() => {
    if (Object.keys(contacts).length === 0) {
      getContactsFetch().then(([getErr, contacts]) => {
        if (contacts) {
          setContacts(contacts.data.attributes);
        } else {
          push('/error');
          console.log(getErr);
        }
      });
    }
  }, []);

  return (
    <div className='feedback-background' id='contacts'>
      <div className='container'>
        <section className='feedback'>
          <h2 className='title underline'>Зворотній зв’язок</h2>
          <div className='feedback-wrapper'>
            <div>
              <h3 className='title-xl feedback-title'>Контакти</h3>
              {Object.keys(contacts).length > 0 ? (
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
                    }
                  })}
                </div>
              ) : (
                <Loader className='feedback-loader' />
              )}
            </div>
            <div>
              <h3 className='title-xl feedback-title'>Зв'язок</h3>
              <FeedbackForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
