import { GalleryItem, GalleryItemImg } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ picData, toggleModal, setActivePic }) => {
  const openModal = ({ largeImageURL }) => {
    setActivePic(largeImageURL);
    toggleModal();
  };
  // console.log(picData);
  return picData.map(({ id, webformatURL, largeImageURL }) => {
    return (
      <GalleryItem key={id}>
        <GalleryItemImg
          src={webformatURL}
          alt=""
          onClick={() => openModal({ largeImageURL })}
        />
        {/* <Modal toggleModal={toggleModal} pic={pictures.largeImageURL} /> */}
      </GalleryItem>
    );
  });
};
export default ImageGalleryItem;
//
ImageGalleryItem.propTypes = {
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
