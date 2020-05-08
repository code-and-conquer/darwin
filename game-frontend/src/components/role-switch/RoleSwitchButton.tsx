import React, { FC, useMemo } from 'react';
import { RoleRequest, Role } from '@darwin/types';
import Button from '../visual/Button';
import { useSendMessage } from '../../service/game';

interface Props {
  roleToRequest: Role;
}

const RoleSwitchButton: FC<Props> = ({ roleToRequest, children }) => {
  const sendMessage = useSendMessage();

  const sendRoleRequest = useMemo(
    () => (newRole: Role): void => {
      const scriptUpdate: RoleRequest = {
        type: 'roleRequest',
        payload: {
          newRole,
        },
      };
      sendMessage(scriptUpdate);
    },
    [sendMessage]
  );

  return (
    <Button
      onClick={(): void => {
        sendRoleRequest(roleToRequest);
      }}
    >
      {children}
    </Button>
  );
};

export default RoleSwitchButton;
