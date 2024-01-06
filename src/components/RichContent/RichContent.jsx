import Paragraph from 'components/RichContent/Types/Paragraph';
import Image from 'components/RichContent/Types/Image';
import List from 'components/RichContent/Types/List';
import 'components/RichContent/RichContent.css';

export default function RichContent({ content: { type, children } }) {
  console.log(type);
  console.log(children);
  switch (type) {
    case 'paragraph':
      return <Paragraph children={children} />;
    case 'image':
      return <Image />;
    case 'list':
      return <List children={children} />;
    default:
      return null;
  }
}
