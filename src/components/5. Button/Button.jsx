import React from 'react';
import {LoadMoreButton} from './Button.styled';

export const Button = ({loadMoreHandler}) => {
  return (
    <LoadMoreButton onClick={loadMoreHandler}>
      Load more
    </LoadMoreButton>
  );
};