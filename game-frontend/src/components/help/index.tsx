import React, { FC } from 'react';
import { Dialog } from '@reach/dialog';
import useDialogState from '../../hooks/useDialogState';
import Button from '../visual/Button';
import Container from './Container';
import HelpText from './HelpText';

const Help: FC = () => {
  const [isOpen, open, close] = useDialogState();
  return (
    <>
      <Container>
        <Button onClick={open}>Hilfe</Button>
      </Container>
      <Dialog isOpen={isOpen} onDismiss={close} aria-label="help">
        <button className="close-button" onClick={close}>
          <span>×</span>
        </button>
        <HelpText />
      </Dialog>
    </>
  );
};

export default Help;
