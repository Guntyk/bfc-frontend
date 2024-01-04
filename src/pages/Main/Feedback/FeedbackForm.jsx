export default function FeedbackForm() {
  return (
    <form className='feedback-form text'>
      <div className='inputs-group'>
        <input className='name-input' name='name' type='text' placeholder='Ім’я та Прізвище...' />
        <input className='contact-input' name='contact' type='text' placeholder='Номер телефону чи E-Mail' />
      </div>
      <textarea name='message' cols='30' rows='10' placeholder='Ваше повідомлення...' />
      <button type='submit'>Надіслати</button>
    </form>
  );
}
