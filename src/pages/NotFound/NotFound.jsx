import { useHistory } from 'react-router-dom';
import 'pages/NotFound/NotFound.css';

export default function NotFound() {
  const { replace } = useHistory();

  return (
    <section className='not-found'>
      <span className='title-xl'>Такої сторінки <span className='underline'>не існує</span>!</span>
      <button
        className='blue-btn'
        onClick={() => {
          replace('/');
        }}
      >
        На головну
      </button>
    </section>
  );
}
