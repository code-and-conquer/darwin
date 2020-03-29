import React from 'react';

function useDialogState(): [boolean, () => void, () => void] {
  const [isDialogOpen, setDialogOpen] = React.useState(false);
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
