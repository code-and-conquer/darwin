import React, { FC } from 'react';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.04);
  color: black;
  padding: 2rem;
  width: 50vw;
  height: 50vh;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`;

const HelpDialog: FC = () => {
  return <Modal>Move Unit</Modal>;
};

export default HelpDialog;
