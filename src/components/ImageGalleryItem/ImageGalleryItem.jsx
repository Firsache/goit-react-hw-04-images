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
}) {
  const elemToScroll = useRef(null);

  useEffect(() => {
    const header = document.querySelector('#header');
    const heightOffset = header.offsetHeight + 15;
    // console.log(heightOffset);

    if (!isScrollAnchor) return;
    scrollWithOffset(elemToScroll.current, heightOffset);
  }, [isScrollAnchor]);

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
