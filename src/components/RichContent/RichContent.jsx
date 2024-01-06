import Paragraph from 'components/RichContent/Types/Paragraph';
import Image from 'components/RichContent/Types/Image';
import List from 'components/RichContent/Types/List';
import 'components/RichContent/RichContent.css';

export default function RichContent({ content }) {
  return (
    content.length > 0 &&
    content.map(({ type, children }) => {
      switch (type) {
        case 'paragraph':
          return <Paragraph children={children} />;
        case 'image':
          return <Image />;
        case 'list':
          return <List children={children} />;
        case 'quote':
          return (
            <div className='quote'>
              <Paragraph children={children} />
            </div>
          );
        default:
          return null;
      }
    })
  );
}
