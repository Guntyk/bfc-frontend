import RichContent from 'components/RichContent/RichContent';
import cross from 'icons/cross.svg';
import 'components/Modal/Modal.css';

export default function Modal({ id, isActive, setIsActive, title, content }) {
  return (
    <div className={`background ${isActive === id ? 'active' : ''}`}>
      <div className='modal'>
        <div className='heading'>
          {title && <span className='title-l'>{title}</span>}
          <button
            className='close'
            onClick={() => {
              setIsActive(false);
            }}
          >
            <img src={cross} alt='Закрити' />
          </button>
        </div>
        <div className='content text-l'>
          <RichContent content={content} />
        </div>
      </div>
    </div>
  );
}
