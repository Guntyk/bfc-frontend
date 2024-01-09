import { useId } from 'react';
import Paragraph from 'components/RichContent/Types/Paragraph';
import Image from 'components/RichContent/Types/Image';
import List from 'components/RichContent/Types/List';
import 'components/RichContent/RichContent.css';

export default function RichContent({ content }) {
  const id = useId();

  return (
    content.length > 0 &&
    content.map(({ type, children }, index) => {
      switch (type) {
        case 'paragraph':
          return <Paragraph children={children} key={`${id}-${index}`} />;
        case 'image':
          return <Image key={`${id}-${index}`} />;
        case 'list':
          return <List children={children} key={`${id}-${index}`} />;
        case 'quote':
          return (
            <div className='quote' key={`${id}-${index}`}>
              <Paragraph children={children} />
            </div>
          );
        default:
          return null;
      }
    })
  );
}
