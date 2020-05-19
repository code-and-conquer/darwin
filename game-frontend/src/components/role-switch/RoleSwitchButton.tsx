import React, { FC, useCallback } from 'react';
import { Role } from '@darwin/types';
import Button from '../visual/Button';
import { useSendMessage } from '../../service/game';
import { createRoleRequestMessage, useRole } from '../../service/game/role';

interface Props {
  roleToRequest: Role;
}

const RoleSwitchButton: FC<Props> = ({ roleToRequest, children }) => {
  const sendMessage = useSendMessage();
  const [, setRole] = useRole();

  const sendRoleRequest = useCallback((): void => {
    sendMessage(createRoleRequestMessage(roleToRequest));
    setRole(roleToRequest);
  }, [sendMessage, roleToRequest, setRole]);

  return <Button onClick={sendRoleRequest}>{children}</Button>;
};

export default RoleSwitchButton;
