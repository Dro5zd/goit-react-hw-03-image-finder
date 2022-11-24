import React from 'react';
import {ImageGalleryList} from './ImageGallery.styled';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import * as PropTypes from 'prop-types';

export function ImageGallery(props) {
  const imgArr = props.images;
  return (
    <ImageGalleryList>
      {imgArr.map(img =>
        <ImageGalleryItem key={img.id}
                          smallImg={img.webformatURL}
                          bigImg={img.largeImageURL}
                          tag={img.tags}
        />)}
    </ImageGalleryList>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    webformatURL: PropTypes.string,
    largeImageURL: PropTypes.string,
    tags: PropTypes.string
  })).isRequired,
};