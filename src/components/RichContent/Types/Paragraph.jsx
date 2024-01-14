import { useId } from 'react';
import Link from 'components/RichContent/Types/Link';

export default function Paragraph({ children }) {
  const id = useId();

  return (
    <p className='text'>
      {children.map(({ type, text, underline, italic, bold, strikethrough, children, url }, index) => {
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

        return type === 'link' ? (
          <Link children={children} url={url} />
        ) : textStyle.length === 0 ? (
          text
        ) : (
          <span className={`text ${textStyle}`} key={`${id}-${index}`}>
            {text}
          </span>
        );
      })}
    </p>
  );
}
