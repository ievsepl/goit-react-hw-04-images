import React, { useEffect } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';
import PropTypes from 'prop-types';

// const modalRoot = document.querySelector('.modal-root');

const Modal = ({ toggleModal, largePic }) => {
  useEffect(() => {
    const onCloseEsc = evt => {
      if (evt.code === 'Escape') {
        console.log('Esc');
        toggleModal();
      }
    };

    window.addEventListener('keydown', onCloseEsc);

    return () => {
      window.removeEventListener('keydown', onCloseEsc);
    };
  }, [toggleModal]);

  const backdropClose = evt => {
    if (evt.target === evt.currentTarget) {
      toggleModal();
    }
  };

  return (
    <Overlay className="overlay" onClick={backdropClose}>
      <ModalStyle className="modal">
        <img src={largePic} alt="" />
      </ModalStyle>
    </Overlay>
    // ,
    // modalRoot
  );
};
export default Modal;

Modal.propTypes = {
  largePic: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
