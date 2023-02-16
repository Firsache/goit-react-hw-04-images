import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export function GalleryList({ images, toggleModal }) {
  return (
    <List>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
        <GalleryItem
          key={id}
          src={webformatURL}
          alt={tags}
          toggleModal={toggleModal}
          largeImageURL={largeImageURL}
        />
      ))}
    </List>
  );
}
GalleryList.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
