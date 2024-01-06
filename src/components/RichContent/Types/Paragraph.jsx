export default function Paragraph({ children }) {
  return children.length === 1 && children[0].text === '' ? (
    <>
      {/* <br /> */}
    </>
  ) : (
    <p className='text'>
      {children.map(({ text, underline, italic, bold, strikethrough }) => {
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

        return textStyle.length === 0 ? text : <span className={`text ${textStyle}`}>{text}</span>;
      })}
    </p>
  );
}
