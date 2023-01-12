import React, { useState, useEffect, useRef } from 'react';
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

export const App = () => {
  const initFetch = useRef(true);
  const [searchName, setSearchName] = useState('');
  const [pictures, setPictures] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [renderModal, setRenderModal] = useState(false);
  const [status, setStatus] = useState('idle');
  const [largeImg, setLargeImg] = useState('');
  // console.log(pictures);
  // console.log(pageNumber);

  useEffect(() => {
    if (searchName !== '') {
      setStatus('pending');
      try {
        fetchData(searchName, pageNumber).then(data => {
          data.map(({ id, webformatURL, largeImageURL }) => {
            return setPictures(prevState => [
              ...prevState,
              { id, webformatURL, largeImageURL },
            ]);
          });
          setStatus('resolved');

          if (data.length === 0) {
            return toast.error(`There are no images with name: ${searchName}`);
          } else if (data.length < 12) {
            toast.warn('There are no more images to load!');
            setStatus('idle');
          }
        });
      } catch (error) {
        setStatus('rejected');

        console.error(error);
      }
    }
    initFetch.current = false;
  }, [pageNumber, searchName]);

  const onSubmit = searchName => {
    setSearchName(searchName);
    setPageNumber(1);
    setPictures([]);
  };

  const toggleModal = () => {
    setRenderModal(prev => !prev);
    console.log(renderModal);
  };

  const setActivePic = largeImg => {
    setLargeImg(largeImg);
    // console.log(largeImg);
  };

  const loadMorePic = () => {
    setPageNumber(prev => prev + 1);
    // console.log(this.state.pageNumber);
  };

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
      {status === 'rejected' && <span>Something Wrong. Please try again!</span>}
      <ToastContainer autoClose={2000} />
    </AppStyle>
  );
};
