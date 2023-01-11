import React, { Component } from 'react';
import { Overlay, ModalStyle } from './Modal.styled';
import PropTypes from 'prop-types';

// const modalRoot = document.querySelector('.modal-root');

class Modal extends Component {
  static propTypes = {
    largePic: PropTypes.string.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseEsc);
  }

  onCloseEsc = evt => {
    if (evt.code === 'Escape') {
      console.log('Esc');
      this.props.toggleModal();
    }
  };

  backdropClose = evt => {
    // console.log(evt);
    // console.dir(evt.target.nodeName);
    // console.log(evt.currentTarget);
    if (evt.target === evt.currentTarget) {
      this.props.toggleModal();
    }
  };

  render() {
    return (
      <Overlay className="overlay" onClick={this.backdropClose}>
        <ModalStyle className="modal">
          <img src={this.props.largePic} alt="" />
        </ModalStyle>
      </Overlay>
      // ,
      // modalRoot
    );
  }
}
export default Modal;
