export default function Image({ image: { url, alternativeText } }) {
  return <img src={url} alt={alternativeText} />;
}
