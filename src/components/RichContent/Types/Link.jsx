export default function Link({ children, url }) {
  return (
    <a className='text-link' href={url} target='_blank' rel='noreferrer noopener'>
      {children[0].text}
    </a>
  );
}
