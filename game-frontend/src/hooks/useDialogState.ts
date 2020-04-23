import React from 'react';

function useDialogState(
  initialState: boolean
): [boolean, () => void, () => void] {
  const [isDialogOpen, setDialogOpen] = React.useState(initialState);
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
