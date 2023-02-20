import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { scrollWithOffset } from 'services/scrollWithOffset';
import { Item, Img } from './ImageGalleryItem.styled';

export function GalleryItem({
  src,
  alt,
  toggleModal,
  largeImageURL,
  isScrollAnchor,
  heightOffset,
}) {
  const elemToScroll = useRef(null);

  useEffect(() => {
    if (!isScrollAnchor) return;
    scrollWithOffset(elemToScroll.current, heightOffset);
  }, [heightOffset, isScrollAnchor]);

  return (
    <Item ref={elemToScroll}>
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
  isScrollAnchor: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
