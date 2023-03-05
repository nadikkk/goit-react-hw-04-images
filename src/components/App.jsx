import { useState, useEffect } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetch from '../services/api';

export default function App() {
  const [nameImg, setNameImg] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoader, setIsLoader] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [bigImg, setBigImg] = useState('');

  const isSearchNameImg = nameImges => {
    if (nameImges !== nameImg) {
      setNameImg(nameImges);
      setImages([]);
      setPage(1);
    }
  };

  useEffect(() => {
    if (!nameImg) {
      return;
    }
    setIsLoader(true);
    fetch(nameImg, page)
      .then(({ data }) => {
        if (data.total === 0) {
          return alert('There are no images for this request, try again');
        }
        setImages(prevState => {
          return [...prevState, ...data.hits];
        });
      })
      .catch(error => console.log(error.message))
      .finally(() => setIsLoader(false));
  }, [nameImg, page]);

  const isChangePage = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };
  const isOpenModal = img => {
    setIsModal(true);
    setBigImg(img);
    return img;
  };
  const isCloseModal = () => {
    setIsModal(false);
    setBigImg('');
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={isSearchNameImg} />
      <div>
        {images.length !== 0 && (
          <ImageGallery gallery={images} bigImg={isOpenModal} />
        )}
        {(images.length >= 12 && !isLoader) && <Button onClick={isChangePage} />}
        {isLoader && <Loader />}
      </div>
      {isModal && <Modal bigImg={bigImg} close={isCloseModal} />}
    </div>
  );
}
