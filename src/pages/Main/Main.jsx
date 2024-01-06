import Feedback from 'pages/Main/Feedback/Feedback';
import Survey from 'pages/Main/Survey/Survey';
import Hero from 'pages/Main/Hero/Hero';
import Team from 'pages/Main/Team/Team';
import News from 'pages/Main/News/News';

export default function Main() {
  return (
    <main>
      <Hero />
      <Team />
      <News />
      <Survey />
      <div className='container'>
        <Feedback />
      </div>
    </main>
  );
}
