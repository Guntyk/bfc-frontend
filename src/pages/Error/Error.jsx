import 'pages/Error/Error.css';

export default function Error() {
  return (
    <section className='error-page'>
      <p className='title-xl'>
        Сталася <span className='error-underlined'>помилка</span>!
      </p>
      <p className='text-l'>Перезавантажте сторінку або поверніться до нас пізніше</p>
    </section>
  );
}
