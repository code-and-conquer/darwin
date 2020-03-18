import React from 'react';
import { Dialog as ReachDialog, DialogProps } from '@reach/dialog';
import '@reach/dialog/styles.css';

const Dialog = (props: DialogProps): JSX.Element => {
  return <ReachDialog {...props} />;
};

export default Dialog;
