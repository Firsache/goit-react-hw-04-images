import PropTypes from 'prop-types';
import { Item, Img } from './ImageGalleryItem.styled';

export function GalleryItem({ src, alt, toggleModal, largeImageURL }) {
  return (
    <Item>
      <Img
        src={src}
        alt={alt}
        onClick={() => toggleModal({ alt, largeImageURL })}
        largeImageURL={largeImageURL}
      />
    </Item>
  );
}

GalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
