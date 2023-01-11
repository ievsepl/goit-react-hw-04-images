import React, { Component } from 'react';
import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

class ImageGalleryItem extends Component {
  static propTypes = {
    picData: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
      })
    ),
    toggleModal: PropTypes.func.isRequired,
    setActivePic: PropTypes.func.isRequired,
  };
  setActivePic = ({ largeImageURL }) => {
    this.props.setActivePic(largeImageURL);
    this.props.toggleModal();
  };

  render() {
    const { picData } = this.props;
    return picData.map(({ id, webformatURL, largeImageURL }) => {
      return (
        <GalleryItem key={id}>
          <GalleryItemImg
            src={webformatURL}
            alt=""
            onClick={() => this.setActivePic({ largeImageURL })}
          />
          {/* <Modal toggleModal={toggleModal} pic={pictures.largeImageURL} /> */}
        </GalleryItem>
      );
    });
  }
}
export default ImageGalleryItem;
//
