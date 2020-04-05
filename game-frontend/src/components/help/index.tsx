import React, { FC, useState } from 'react';
import useDialogState from '../../hooks/useDialogState';
import Button from '../visual/Button';
import Container from './Container';
import HelpText from './HelpText';
import DialogWrapper from '../dialog/DialogWrapper';
import Dialog from '../dialog';
import NavigationBar from './NavigationBar';

export enum Tab {
  START = 'Start',
  POWERUPS = 'Powerups',
}

const Help: FC = () => {
  const [isOpen, open, close] = useDialogState();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.START);
  return (
    <>
      <Container>
        <Button onClick={open}>Hilfe</Button>
      </Container>
      <Dialog isOpen={isOpen} onDismiss={close} aria-label="help">
        <DialogWrapper>
          <NavigationBar setActiveTab={setActiveTab} />
          <Button className="close-button" onClick={close}>
            <span>×</span>
          </Button>
          {activeTab === Tab.START && <HelpText />}
          {activeTab === Tab.POWERUPS && <h1>Power Ups</h1>}
        </DialogWrapper>
      </Dialog>
    </>
  );
};

export default Help;
