import styled from 'styled-components';

export const OverlayModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: ${props => (props.modalClose === false ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalDiv = styled.div`
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
  transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover{
    transform: scale(1.03);
    cursor: zoom-out;
  }
`;