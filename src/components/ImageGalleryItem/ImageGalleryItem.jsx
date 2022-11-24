import React from 'react';
import {ImageGalleryLi} from './ImageGalleryItem.styled';
import * as PropTypes from 'prop-types';

export function ImageGalleryItem({smallImg, tag, showModal}) {
  return (
    <ImageGalleryLi>
      <img src={smallImg} alt={tag} onClick={showModal}/>
    </ImageGalleryLi>
  );
}

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  smallImg: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
}