import 'components/Loader/Loader.css';

export default function Loader({ className }) {
  return (
    <div className={`loader-wrapper ${className}`}>
      <div className='loader' />
    </div>
  );
}
