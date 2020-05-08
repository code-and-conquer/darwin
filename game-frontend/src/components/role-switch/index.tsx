import React, { FC, useMemo } from 'react';
import { RoleRequest, Role } from '@darwin/types';
import Button from '../visual/Button';
import { useRole, useSendMessage } from '../../service/game';

const getRoleText = (role: Role): string =>
  role === Role.SPECTATOR ? 'zuschauen' : 'spielen';

const RoleSwitch: FC = () => {
  const role = useRole();
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

  const roleToRequest = role === Role.SPECTATOR ? Role.PLAYER : Role.SPECTATOR;

  return (
    <Button
      className="small"
      onClick={(): void => {
        sendRoleRequest(roleToRequest);
      }}
    >
      Ich möchte {getRoleText(roleToRequest)}!
    </Button>
  );
};

export default RoleSwitch;
