import PropTypes from 'prop-types';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { List } from './ImageGallery.styled';

export function GalleryList({ images, toggleModal, heightOffset }) {
  return (
    <List>
      {images.map(
        ({ id, tags, webformatURL, largeImageURL, isScrollAnchor }) => (
          <GalleryItem
            key={id}
            src={webformatURL}
            alt={tags}
            toggleModal={toggleModal}
            heightOffset={heightOffset}
            largeImageURL={largeImageURL}
            isScrollAnchor={isScrollAnchor}
          />
        )
      )}
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
      isScrollAnchor: PropTypes.bool.isRequired,
    }).isRequired
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
