import styled from 'styled-components';
import Button from '../visual/Button';

const DialogWrapper = styled.div`
  position: relative;

  ${Button}.top-right {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export default DialogWrapper;
