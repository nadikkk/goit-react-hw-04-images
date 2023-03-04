import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export default function ImageGallery({ gallery, bigImg }) {
  return (
    <ul className={css.gallery}>
      {gallery.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <li
            key={id}
            className={css.item}
            onClick={() => {
              bigImg(largeImageURL);
            }}
          >
            <ImageGalleryItem alt={tags} src={webformatURL} />
          </li>
        );
      })}
    </ul>
  );
}
ImageGallery.propTypes = {
  bigImg: PropTypes.func.isRequired,
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
