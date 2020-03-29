import React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

function useDialogState(): [boolean, () => void, () => void] {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  useHotkeys('?', () => setDialogOpen(true));
  return [
    isDialogOpen,
    (): void => {
      setDialogOpen(true);
    },
    (): void => {
      setDialogOpen(false);
    },
  ];
}

export default useDialogState;
