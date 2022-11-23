import React from 'react';
import {ImageGalleryList} from './ImageGallery.styled';
import {ImageGalleryItem} from '../3. ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends React.Component {


  render() {
    const imgArr = this.props.images
    return (
      <ImageGalleryList>
        {imgArr.map(img =>
        <ImageGalleryItem key={img.id}
                          smallImg={img.webformatURL}
                          tag={img.tags}
                          isOpen={this.props.isOpen}/>)}
      </ImageGalleryList>
          );
        };
        }