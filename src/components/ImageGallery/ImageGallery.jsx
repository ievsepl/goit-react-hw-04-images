import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import { Gallery } from './ImageGallery.styled';
import PropTypes from 'prop-types';

const ImageGallery = ({ picData, setActivePic, toggleModal }) => {
  return (
    <Gallery>
      <ImageGalleryItem
        picData={picData}
        setActivePic={setActivePic}
        toggleModal={toggleModal}
      />
    </Gallery>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
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
//
//
//
// class ImageGallery extends Component {
//   render() {
//     return (
//       <Gallery>
//         <ImageGalleryItem
//           picData={this.props.picData}
//           setActivePic={this.props.setActivePic}
//           toggleModal={this.props.toggleModal}
//         />
//       </Gallery>
//     );
//   }
// }
