import React from 'react';
import {OverlayModal, ModalDiv} from './Modal.styled';

export const Modal = ({isOpen, openModalToggle, bigImg}) => {
  return (
    <OverlayModal modalClose={isOpen} onClick={openModalToggle}>
      <ModalDiv>
        <img src={bigImg} alt=''/>
      </ModalDiv>
    </OverlayModal>
  );
};