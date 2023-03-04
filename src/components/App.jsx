import { Component } from 'react';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import fetch from '../services/api';

export default class App extends Component {
  state = {
    nameImg: '',
    images: [],
    page: 1,
    isLoader: false,
    isModal: false,
    bigImg: '',
  };

  isSearchNameImg = nameImg => {
    if (nameImg !== this.state.nameImg) {
      this.setState({ nameImg, images: [], page: 1 });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { nameImg, page } = this.state;
    if (prevState.nameImg !== nameImg || prevState.page !== page) {
      this.isFetchImg();
    }
  }

  isFetchImg = () => {
    const { nameImg, page } = this.state;
    this.setState({ isLoader: true });
    fetch(nameImg, page)
      .then(({ data }) => {
        if (data.total === 0) {
          return alert('There are no images for this request, try again');
        }
        this.setState(prevState => {
          return { images: [...prevState.images, ...data.hits] };
        });
      })
      .catch(error => console.log(error.message))
      .finally(() => this.setState({ isLoader: false }));
  };

  isChangePage = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };
  isOpenModal = img => {
    this.setState({ isModal: true });
    this.setState({ bigImg: img });
    return img;
  };
  isCloseModal = () => {
    this.setState({ isModal: false });
  };

  render() {
    const { images, isLoader, isModal, bigImg } = this.state;
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.isSearchNameImg} />
        <div>
          <ImageGallery gallery={images} bigImg={this.isOpenModal} />
          {images.length >= 12 && <Button onClick={this.isChangePage} />}
          {isLoader && <Loader />}
        </div>
        {isModal && <Modal bigImg={bigImg} close={this.isCloseModal} />}
      </div>
    );
  }
}
