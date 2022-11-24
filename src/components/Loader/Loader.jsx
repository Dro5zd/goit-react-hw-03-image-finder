import {Bars} from 'react-loader-spinner';

import React from 'react';
import {LoaderWrapper} from './Loader.styled';
import * as PropTypes from 'prop-types';

export const Loader = ({isLoading}) => {
  return (
    <LoaderWrapper disable={isLoading}>
      <Bars
        height="80"
        width="80"
        color='rgba(48, 21, 77)'
        ariaLabel="bars-loading"
        visible={isLoading}
      />
    </LoaderWrapper>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}




