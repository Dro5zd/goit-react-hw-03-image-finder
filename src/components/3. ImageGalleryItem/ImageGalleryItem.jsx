import React from 'react';
import {ImageGalleryLi} from './ImageGalleryItem.styled';

export function ImageGalleryItem(props) {
  return (
    <ImageGalleryLi>
      <img src={props.smallImg} alt={props.tag} onClick={props.isOpen}/>
    </ImageGalleryLi>
  );
}