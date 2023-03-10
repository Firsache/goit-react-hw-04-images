import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  SearchBar,
  Loading,
  GalleryList,
  ModalWindow,
  Button,
} from 'components/index';
import { fetchImages } from 'services/app';
import { App } from './App.styled';
import { useRef } from 'react';

export function Gallery() {
  const [images, setImages] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageInfo, setImageInfo] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [gap, setGap] = useState(0);

  const appRef = useRef(null);

  useEffect(() => {
    if (appRef) {
      const gap = Number.parseInt(
        getComputedStyle(appRef.current).getPropertyValue('gap')
      );
      setGap(gap);
    }
  }, []);

  useEffect(() => {
    async function getImages() {
      if (!searchedValue) return;

      try {
        setIsLoading(true);

        const { hits, total } = await fetchImages(searchedValue, page);

        if (total === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }

        if (total > 0 && page === 1) {
          toast.success(`Horray! We found ${total} images.`);
        }

        setImages(prevState => [...prevState, ...hits]);
        setTotal(total);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [searchedValue, page]);

  useEffect(() => {
    if (!images?.length) return;

    if (total > 0 && images?.length === total) {
      toast.info("We're sorry, but you've reached the end of search results.");
    }
  }, [images?.length, total]);

  const getSearchedValue = value => {
    setSearchedValue(value);
    setPage(1);
    setImages([]);
    setTotal(0);
    pageUp();
  };

  const handlePageChange = () => {
    setPage(prevState => prevState + 1);
  };

  const getImageInfo = (imageInfo = null) => {
    setImageInfo(imageInfo);
  };

  const pageUp = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  const heightOffset = headerHeight + gap;
  return (
    <App ref={appRef}>
      <SearchBar
        onSubmit={getSearchedValue}
        setHeaderHeight={setHeaderHeight}
      />
      {isLoading && <Loading />}
      <GalleryList
        heightOffset={heightOffset}
        images={images}
        toggleModal={getImageInfo}
      />

      {imageInfo && (
        <ModalWindow onClose={getImageInfo} imageInfo={imageInfo} />
      )}

      {images.length > 0 && images.length !== total && (
        <Button handlePageChange={handlePageChange} />
      )}
      <ToastContainer autoClose={3000} newestOnTop theme="dark" />
    </App>
  );
}
