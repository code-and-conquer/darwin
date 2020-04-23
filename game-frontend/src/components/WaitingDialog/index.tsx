import React from 'react';
import Dialog from '../dialog';
import DialogWrapper from '../dialog/DialogWrapper';
import Button from '../visual/Button';
import useDialogState from '../../hooks/useDialogState';
import Text from './Text';

type Props = {
  hasJoinedGame: boolean;
};

function WaitingDialog(props: Props): JSX.Element {
  const [isOpen, , close] = useDialogState(true);

  return (
    <Dialog
      isOpen={!props.hasJoinedGame && isOpen}
      onDismiss={close}
      aria-label="help"
    >
      <DialogWrapper>
        <Button className="close-button top-right" onClick={close}>
          <span>×</span>
        </Button>
        <Text />
        <Button onClick={close}>OK</Button>
      </DialogWrapper>
    </Dialog>
  );
}

export default WaitingDialog;
