import Feedback from 'pages/Main/Feedback/Feedback';
import Survey from 'pages/Main/Survey/Survey';
import Hero from 'pages/Main/Hero/Hero';
import Team from 'pages/Main/Team/Team';
import News from 'pages/Main/News/News';
import 'pages/Main/Main.css';

export default function Main() {
  return (
    <main className='main'>
      <Hero />
      <Team />
      <News />
      <Survey />
      <Feedback />
    </main>
  );
}
