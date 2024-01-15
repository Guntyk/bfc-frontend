import ReactPlayer from 'react-player';

export default function VideoPlayer({ src }) {
  return <ReactPlayer className='video-wrapper' controls url={src} />;
}
