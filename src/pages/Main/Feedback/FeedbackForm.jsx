import { sendMessageToBot } from 'api/requests';
import { useState } from 'react';

export default function FeedbackForm() {
  const [error, setError] = useState(false);
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const { name, contact, text } = e.target;
    console.log(name.value);
    console.log(contact.value);
    console.log(text.value);
    if (name.value === '' || contact.value === '' || text.value === '') {
      setError(true);
    } else {
      const message = `👤Ім'я: ${name.value}\n📞Контакт: ${contact.value}\n💬Повідомлення: ${text.value}`;
      sendMessageToBot(message);
      setSent(true);
    }
  }

  if (!sent) {
    return (
      <form className='feedback-form text' onSubmit={handleSubmit}>
        <div className='inputs-group'>
          <input className='name-input' name='name' type='text' placeholder='Ім’я та Прізвище...' />
          <input className='contact-input' name='contact' type='text' placeholder='Номер телефону чи E-Mail' />
        </div>
        <textarea name='text' cols='30' rows='10' placeholder='Ваше повідомлення...' />
        {error && <p className='error'>Заповніть усі поля</p>}
        <button type='submit'>Надіслати</button>
      </form>
    );
  } else {
    return (
      <div className='feedback-thanks thanks'>
        <span className='title-l underline'>Дякуємо!</span>
        <span className='text'>Ми зв'яжемось з Вами найближчим часом</span>
      </div>
    );
  }
}
