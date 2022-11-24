import React from 'react';
import {ImageGalleryLi} from './ImageGalleryItem.styled';
import * as PropTypes from 'prop-types';
import {Modal} from '../Modal/Modal';

export class ImageGalleryItem extends React.Component {
  state = {
    showModal: false,
    smallImg: ''
  };

  toggleModal = () => {
      this.setState(({showModal}) => ({showModal: !showModal}));
  };

  closeModalOnBackdrop = (e) => {
    if (e.currentTarget === e.target) {
      this.setState(({showModal}) => ({showModal: !showModal}));
    }
  };

  render() {
    let {smallImg, tag, bigImg} = this.props;
    return (
      <>
        <ImageGalleryLi>
          <img src={smallImg} alt={tag} onClick={this.toggleModal}/>
        </ImageGalleryLi>
        {this.state.showModal && <Modal
          showModal={this.toggleModal}
          closeModalOnBackdrop={this.closeModalOnBackdrop}
          bigImg={bigImg}
          tag={tag}
        />}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  smallImg: PropTypes.string.isRequired,
  bigImg: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
}