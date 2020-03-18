import React, { FC } from 'react';
import { Dialog } from '@reach/dialog';
import useDialogState from '../../hooks/useDialogState';
import Button from '../visual/Button';
import Container from './Container';
import HelpText from './HelpText';
import DialogWrapper from '../dialog/DialogWrapper';

const Help: FC = () => {
  const [isOpen, open, close] = useDialogState();
  return (
    <>
      <Container>
        <Button onClick={open}>Hilfe</Button>
      </Container>
      <Dialog isOpen={isOpen} onDismiss={close} aria-label="help">
        <DialogWrapper>
          <Button className="close-button" onClick={close}>
            <span>×</span>
          </Button>
          <HelpText />
        </DialogWrapper>
      </Dialog>
    </>
  );
};

export default Help;
