import Hero from 'pages/Main/Hero/Hero';
import Team from 'pages/Main/Team/Team';
import News from './News/News';

export default function Main() {
  return (
    <main>
      <Hero />
      <div className='container'>
        <Team />
        <News />
      </div>
    </main>
  );
}
