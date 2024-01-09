import { useId } from 'react';
import Paragraph from 'components/RichContent/Types/Paragraph';

export default function List({ children }) {
  const id = useId();

  return (
    <ul className='list'>
      {children.map(({ children }, index) => (
        <li className='list-item' key={`${id}-${index}`}>
          <Paragraph children={children} />
        </li>
      ))}
    </ul>
  );
}
