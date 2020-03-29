import React, { FC } from 'react';
import { HotKeys } from 'react-hotkeys';
import useDialogState from '../../hooks/useDialogState';
import Button from '../visual/Button';
import Container from './Container';
import HelpText from './HelpText';
import DialogWrapper from '../dialog/DialogWrapper';
import Dialog from '../dialog';

const keyMap = {
  OPEN_HELP: '?',
  CLOSE_HELP: 'Esc',
};

const handlers = {
  OPEN_HELP: () => alert('? pressed'),
};

const Help: FC = () => {
  const [isOpen, open, close] = useDialogState();
  return (
    <>
      <HotKeys keyMap={keyMap} handlers={handlers}>
        <Container>
          <Button onClick={open}>Hilfe</Button>
        </Container>
        <Dialog isOpen={isOpen} onDismiss={close} aria-label="help">
          <DialogWrapper>
            <Button className="close-button" onClick={close}>
              <span>Schliessen</span>
            </Button>
            <HelpText />
          </DialogWrapper>
        </Dialog>
      </HotKeys>
    </>
  );
};

export default Help;
