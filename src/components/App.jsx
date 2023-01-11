import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import { LoadMoreBtn } from './Button/Button';
import { AppStyle } from './App.styled';
import fetchData from 'services/Api';
import Loader from './Loader/Loader';

// idle - простій
// pending - очікується
// resolved - успішно виконане
// rejected - відхилено(помилка)]
export class App extends Component {
  state = {
    searchName: '',
    pictures: [],
    pageNumber: 1,
    renderModal: false,
    status: 'idle',
    largeImg: '',
  };
  componentDidUpdate(_, prevState) {
    const { searchName, pageNumber, pictures } = this.state;

    if (
      searchName !== prevState.searchName ||
      pageNumber !== prevState.pageNumber
    ) {
      this.setState({ status: 'pending' });
      //
      //
      // setTimeout(() => {

      try {
        fetchData(searchName, pageNumber).then(data => {
          data.map(({ id, webformatURL, largeImageURL }) => {
            return this.setState(prevState => {
              return {
                pictures: [
                  ...prevState.pictures,
                  { id, webformatURL, largeImageURL },
                ],
                status: 'resolved',
              };
            });
          });
          if (data.length === 0) {
            console.log(pictures);

            return toast.error(`There are no images with name: ${searchName}`);
          } else if (data.length < 12) {
            toast.warn('There are no more images to load!');
            this.setState({ status: 'idle' });
          }
        });
      } catch (error) {
        this.setState({ status: 'rejected' });

        console.error(error);
      }

      // }, 5000);
      //
      //
    }
  }

  onSubmit = searchName => {
    this.setState({ searchName, pageNumber: 1, pictures: [] });
  };

  toggleModal = () => {
    this.setState(({ renderModal }) => ({ renderModal: !renderModal }));
  };

  setActivePic = largeImg => {
    this.setState({ largeImg: largeImg });
    // console.log(largeImg);
  };

  loadMorePic = () => {
    this.setState(prevState => {
      return { pageNumber: prevState.pageNumber + 1 };
    });
    // console.log(this.state.pageNumber);
  };

  render() {
    const { renderModal, status, pictures, largeImg } = this.state;
    const { toggleModal, setActivePic, onSubmit, loadMorePic } = this;
    // if (status === 'idle')
    return (
      <AppStyle>
        <Searchbar onSubmitBtn={onSubmit} />

        <ImageGallery
          picData={pictures}
          toggleModal={toggleModal}
          setActivePic={setActivePic}
        />

        {status === 'pending' && <Loader />}
        {renderModal && <Modal toggleModal={toggleModal} largePic={largeImg} />}
        {status === 'resolved' && <LoadMoreBtn onLoadMore={loadMorePic} />}
        {status === 'rejected' && (
          <span>Something Wrong. Please try again!</span>
        )}
        <ToastContainer autoClose={2000} />
      </AppStyle>
    );
  }
}
