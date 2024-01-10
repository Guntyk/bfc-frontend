import { sendMessageToBot } from 'api/requests';
import { useState } from 'react';

export default function FeedbackForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const { name, contact, text } = e.target;
    const message = `👤Ім'я: ${name.value}\n📞Контакт: ${contact.value}\n💬Повідомлення: ${text.value}`;

    sendMessageToBot(message);
    setSent(true);
  }

  if (!sent) {
    return (
      <form className='feedback-form text' onSubmit={handleSubmit}>
        <div className='inputs-group'>
          <input className='name-input' name='name' type='text' placeholder='Ім’я та Прізвище...' />
          <input className='contact-input' name='contact' type='text' placeholder='Номер телефону чи E-Mail' />
        </div>
        <textarea name='text' cols='30' rows='10' placeholder='Ваше повідомлення...' />
        <button type='submit' disabled={false}>
          Надіслати
        </button>
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
