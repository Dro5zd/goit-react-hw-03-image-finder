import React from 'react';
import {OverlayModal, ModalDiv} from './Modal.styled';
import * as PropTypes from 'prop-types';

export class Modal extends React.Component {

  componentDidMount() {
    window.addEventListener('keydown', this.escCloseModal)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.escCloseModal)
  }

  escCloseModal = (e) => {
    if (e.code === "Escape") {
      this.props.showModal()
    }
  }

  render() {
    let {showModal, bigImg} = this.props;
    return (
      <OverlayModal onClick={showModal}>
        <ModalDiv>
          <img src={bigImg} alt=""/>
        </ModalDiv>
      </OverlayModal>
    );
  }
}

Modal.propTypes = {
  showModal: PropTypes.func.isRequired,
  bigImg: PropTypes.string.isRequired,
}