import Paragraph from 'components/Paragraph';
import Image from 'components/Image';
import List from 'components/List';
import { surveys } from 'constants/surveys';
import 'pages/Main/Survey/Survey.css';

export default function Survey() {
  return surveys.length > 0 ? (
    <section className='surveys' id='survey'>
      <div className='container'>
        <h2 className='title underline'>Опитування</h2>
      </div>
      {surveys.map(({ attributes: { yes_no_options, options, description } }) => {
        const textLength = description.flatMap((desc) => desc.children).reduce((totalLength, { text }) => totalLength + text.length, 0);
        console.log(textLength);
        return (
          <div className='survey-background'>
            <div className='container'>
              <div className='survey'>
                <div>
                  <span className='title-s choose-option-title'>Оберіть відповідь</span>
                  <div className='options'>
                    {yes_no_options ? (
                      <>
                        <button>Так, підтримую</button>
                        <button>Ні, не підтримую</button>
                      </>
                    ) : (
                      options.map((option) => <button>{option}</button>)
                    )}
                  </div>
                  <button className='confirm-btn'>Я підтверджую свій вибір</button>
                </div>
                <div>
                  <div className='survey-content'>
                    {description.map(({ type, children, src, alt, items }) => {
                      switch (type) {
                        case 'paragraph':
                          return <Paragraph children={children} />;
                        case 'image':
                          return <Image src={src} alt={alt} />;
                        case 'list':
                          return <List items={items} />;
                        default:
                          return null;
                      }
                    })}
                  </div>
                  {textLength > 800 && <button className='read-more-btn text-s'>Читати повністю</button>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  ) : (
    <></>
  );
}
