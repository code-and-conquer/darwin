import styled from 'styled-components';
import CloseButton from './CloseButton';

const DialogWrapper = styled.div`
  position: relative;

  ${CloseButton} {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default DialogWrapper;
