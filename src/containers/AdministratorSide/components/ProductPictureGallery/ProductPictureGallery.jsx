import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';


import styles from './ProductPictureGallery.module.css';

class ProductPictureGallery extends Component {
  state = {
    currentImageIndex: 0,
    urlImageList: this.props.urlImageList,
    coverImageList: this.props.coverImageList,
    imageList: [...this.props.urlImageList, ...this.props.coverImageList],
    visible: false
  };

  indexOfImageByElement = (imageList, element) => {
    for (let i = 0; i < imageList.length; i++) {
      if (
        imageList[i].url === element.src ||
        imageList[i].imageDecoded === element.src
      ) {
        return i;
      }
    }
  };

  showModal = e => {
    const imageList = this.state.imageList;
    const newCurrentImageIndex = this.state.newCurentImageIndex;

    this.setState({
      currentImageIndex: this.indexOfImageByElement(imageList, e.target) || 0,
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  // Вызывает callback для смены картинки для аватара карточки товара
  setAvatarUrl = () => {
    const avatarUrl =
      this.state.imageList[this.state.currentImageIndex].url ||
      this.state.imageList[this.state.currentImageIndex].imageDecoded;
    this.props.changeAvatarUrl(avatarUrl);
  };

  // Модальное окно подтверждения удаления изображения
  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить изображение?',
      centered: true,
      okText: 'Да',
      okType: 'danger',
      cancelText: 'Нет',
      onOk: () => {
        const {
          imageList,
          urlImageList,
          coverImageList,
          currentImageIndex
        } = this.state;

        const newImageList = imageList.filter(
          el =>
            el.url !== imageList[currentImageIndex].url ||
            el.imageDecoded !== imageList[currentImageIndex].imageDecoded
        );
        const newUrlImageList = urlImageList.filter(
          el => el.url !== imageList[currentImageIndex].url
        );
        const newCoverImageList = coverImageList.filter(
          el => el.imageDecoded !== imageList[currentImageIndex].imageDecoded
        );

        if (currentImageIndex === imageList.length - 1) {
          this.showPrev();
        }

        this.setState(
          {
            imageList: [...newImageList],
            urlImageList: [...newUrlImageList],
            coverImageList: [...newCoverImageList]
          },
          () => {
            !this.state.imageList.length && this.handleCancel();
            this.props.deleteImage(newCoverImageList, newUrlImageList);
          }
        );
      },
      onCancel: () => {
      }
    });
  };

  showPrev = () => {
    const { imageList, currentImageIndex } = this.state;
    const newCurentImageIndex = () => {
      if (currentImageIndex === 0) {
        return imageList.length - 1;
      }
      return currentImageIndex - 1;
    };

    this.setState({
      currentImageIndex: newCurentImageIndex()
    });
  };

  showNext = () => {
    const newCurentImageIndex = () => {
      if (this.state.currentImageIndex === this.state.imageList.length - 1) {
        return 0;
      }
      return this.state.currentImageIndex + 1;
    };

    this.setState({
      currentImageIndex: newCurentImageIndex()
    });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.coverImageList.length !== this.props.coverImageList.length ||
      prevProps.urlImageList.length !== this.props.urlImageList.length
    ) {
      this.setState({
        coverImageList: this.props.coverImageList,
        urlImageList: this.props.urlImageList,
        imageList: [...this.props.urlImageList, ...this.props.coverImageList]
      });
    }
  }

  render() {
    const { visible, imageList, currentImageIndex } = this.state;

    return (
      <>
        <ul className={styles.galleryList}>
          {imageList.map((el, i) => (
            <li
              className={styles.galleryItem}
              key={i}
              index={i}
              onClick={this.showModal}
            >
              <img src={el.imageDecoded || el.url || el} alt="" />
            </li>
          ))}
        </ul>
        <Modal
          width={1000}
          centered
          style={{ userSelect: 'none' }}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="avatar" onClick={this.setAvatarUrl}>
              Установить эту картинку на аватар
            </Button>,
            <Button key="back" onClick={this.showDeleteConfirm}>
              Удалить изображение
            </Button>
            
          ]}
        >
          <p>
            {currentImageIndex + 1} of {imageList.length}
          </p>
          <div className={styles.overViewBlock}>
            {imageList[1] && <p onClick={this.showPrev}>{'<'}</p>}

            {imageList.length && (
              <img
                src={
                  imageList[currentImageIndex] &&
                    imageList[currentImageIndex].url
                    ? imageList[currentImageIndex].url
                    : imageList[currentImageIndex]
                      ? imageList[currentImageIndex].imageDecoded
                      : ''
                }
                alt="product-image"
                className={styles.overViewBlock__img}
              />
            )}

            {imageList[1] && (
              <p onClick={this.showNext} className={styles.overViewBlock__next}>
                >
              </p>
            )}
          </div>
        </Modal>
      </>
    );
  }
}

ProductPictureGallery.propTypes = {
  coverImageList: PropTypes.array.isRequired,
  urlImageList: PropTypes.array.isRequired
};

export default ProductPictureGallery;
