import React from 'react';
import {LoadMoreButton} from './Button.styled';
import * as PropTypes from 'prop-types';

export const Button = ({loadMoreHandler}) => {
  return (
    <LoadMoreButton onClick={loadMoreHandler}>
      Load more
    </LoadMoreButton>
  );
};

Button.propTypes = {
  loadMoreHandler: PropTypes.func.isRequired,
}