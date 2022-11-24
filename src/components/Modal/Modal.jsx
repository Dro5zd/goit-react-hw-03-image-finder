import React from 'react';
import {OverlayModal, ModalDiv} from './Modal.styled';
import * as PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
const modalRoot = document.querySelector('#modal-root')

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
    let {closeModalOnBackdrop, bigImg, tag} = this.props;
    return createPortal(
      <OverlayModal onClick={closeModalOnBackdrop}>
        <ModalDiv>
          <img src={bigImg} alt={tag}/>
        </ModalDiv>
      </OverlayModal>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  showModal: PropTypes.func.isRequired,
  closeModalOnBackdrop: PropTypes.func.isRequired,
  bigImg: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired
}