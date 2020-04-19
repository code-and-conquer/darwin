import React, { FC } from 'react';
// import useDialogState from '../../hooks/useDialogState';
// import Button from '../visual/Button';
import Container from './Container';
import HelpText from './HelpText';
// import DialogWrapper from '../dialog/DialogWrapper';
// import Dialog from '../dialog';

const Help: FC = () => {
  // const [isOpen, open, close] = useDialogState();
  return (
    <>
      <Container>
        <HelpText />
      </Container>
    </>
  );
};

export default Help;
