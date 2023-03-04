import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ alt, src }) {
  return <img src={src} alt={alt} className={css.image} />;
}
