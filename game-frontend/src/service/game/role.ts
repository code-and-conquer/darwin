import createPersistedState from 'use-persisted-state';
import { Role, RoleRequest } from '@darwin/types';
import { useEffect, useState } from 'react';
import { useSendMessage } from '.';

const ROLE_LOCAL_STORAGE_KEY = 'role';
export const useRole = createPersistedState(ROLE_LOCAL_STORAGE_KEY);

export const createRoleRequestMessage = (role: Role): RoleRequest => {
  const message: RoleRequest = {
    type: 'roleRequest',
    payload: {
      newRole: role,
    },
  };
  return message;
};

export const useRoleRequestor = (): void => {
  const [role, setRole] = useRole<Role>(Role.SPECTATOR);
  const [roleSent, setRoleSent] = useState(false);
  const sendMessage = useSendMessage();

  useEffect(() => {
    if (role && !roleSent) {
      sendMessage(createRoleRequestMessage(role));
      setRoleSent(true);
      setRole(role);
    }
  }, [role, roleSent, sendMessage, setRole]);
};
