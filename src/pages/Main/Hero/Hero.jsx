import 'pages/Main/Hero/Hero.css';

export default function Hero() {
  const activities = [
    'Запобігання будь яких рішень щодо знищення нашої громади',
    'Контроль над виконанням будь яких робіт',
    'Проведення спортивних заходів, обʼєднання людей',
    'Допомога людям в юридичних та побутових питаннях',
  ];

  return (
    <section className='hero'>
      <h1 className='title-xl'>ГО «Світле Майбутнє Громади»</h1>
      <p className='text-l'>
        Ми — Громадська організація «Світле Майбутнє Громади», ціль якої займатися налаштуванням прозорості, підзвітності та законності рішень
        Сільської Ради
      </p>
      <ul className='activities'>
        {activities.map((activity) => (
          <li className='activity text-xs' key={activity}>
            {activity}
          </li>
        ))}
      </ul>
    </section>
  );
}
