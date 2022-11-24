import React from 'react';
import {ImageGalleryList} from './ImageGallery.styled';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import * as PropTypes from 'prop-types';
import {Modal} from '../Modal/Modal';

export class ImageGallery extends React.Component {
  state = {
    showModal: false,
    smallImg: ''
  };

  toggleModal = (e) => {
    if (e.currentTarget === e.target) {
      this.setState({smallImg: e.currentTarget.src});
      this.setState(({showModal}) => ({showModal: !showModal}));
    }
  };

  filterByImage = () => {
    const filteredImg = this.props.images.find(imgObj => imgObj.webformatURL === this.state.smallImg) ?? 'photo';
    return filteredImg.largeImageURL;
  };

  render() {
    const imgArr = this.props.images;
    return (
      <ImageGalleryList>
        {imgArr.map(img =>
          <ImageGalleryItem key={img.id}
                            smallImg={img.webformatURL}
                            tag={img.tags}
                            showModal={this.toggleModal}/>)}
        {this.state.showModal && <Modal
          showModal={this.toggleModal}
          bigImg={this.filterByImage()}
        />}
      </ImageGalleryList>
    );
  };
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string
  })).isRequired,
}