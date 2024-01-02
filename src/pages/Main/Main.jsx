import Hero from 'pages/Main/Hero/Hero';
import Team from 'pages/Main/Team/Team';

export default function Main() {
  return (
    <main>
      <Hero />
      <div className='container'>
        <Team />
      </div>
    </main>
  );
}
