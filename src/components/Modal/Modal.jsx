import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Backdrop, Modal } from './Modal.styled';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');

export function ModalWindow({ onClose, imageInfo }) {
  const { largeImageURL, alt } = imageInfo;

  useEffect(() => {
    function handleEscapeClick(evt) {
      if (evt.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleEscapeClick);
    return () => {
      window.removeEventListener('keydown', handleEscapeClick);
    };
  }, [onClose]);

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={handleBackdropClick}>
      <Modal>
        <img src={largeImageURL} alt={alt} />
      </Modal>
    </Backdrop>,
    modalRoot
  );
}

ModalWindow.propTypes = {
  onClose: PropTypes.func.isRequired,
  imageInfo: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
};
