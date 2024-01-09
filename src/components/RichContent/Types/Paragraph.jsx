import { useId } from 'react';

export default function Paragraph({ children }) {
  const id = useId();

  return (
    children[0].text !== '' && (
      <p className='text'>
        {children.map(({ text, underline, italic, bold, strikethrough }, index) => {
          let textStyle = '';

          if (underline) {
            textStyle += ' underline';
          }
          if (strikethrough) {
            textStyle += ' strikethrough';
          }
          if (italic) {
            textStyle += ' italic';
          }
          if (bold) {
            textStyle += ' bold';
          }

          return textStyle.length === 0 ? text : <span className={`text ${textStyle}`} key={`${id}-${index}`}>{text}</span>;
        })}
      </p>
    )
  );
}
