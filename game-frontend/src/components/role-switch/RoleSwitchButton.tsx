import React, { FC, useCallback } from 'react';
import { RoleRequest, Role } from '@darwin/types';
import Button from '../visual/Button';
import { useSendMessage } from '../../service/game';

interface Props {
  roleToRequest: Role;
}

const RoleSwitchButton: FC<Props> = ({ roleToRequest, children }) => {
  const sendMessage = useSendMessage();

  const sendRoleRequest = useCallback((): void => {
    const scriptUpdate: RoleRequest = {
      type: 'roleRequest',
      payload: {
        newRole: roleToRequest,
      },
    };
    sendMessage(scriptUpdate);
  }, [sendMessage, roleToRequest]);

  return <Button onClick={sendRoleRequest}>{children}</Button>;
};

export default RoleSwitchButton;
