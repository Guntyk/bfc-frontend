import Paragraph from 'components/RichContent/Types/Paragraph';

export default function List({ children }) {
  return (
    <ul className='list'>
      {children.map(({ children }) => (
        <li className='list-item'>
          <Paragraph children={children} />
        </li>
      ))}
    </ul>
  );
}
