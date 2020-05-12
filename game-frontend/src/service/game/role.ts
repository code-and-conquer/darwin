import createPersistedState from 'use-persisted-state';
import { Role, RoleResponse, RoleRequest } from '@darwin/types';
import { useEffect, useState } from 'react';
import { useSendMessage } from '.';

const ROLE_LOCAL_STORAGE_KEY = 'role';
export const usePersistRole = createPersistedState(ROLE_LOCAL_STORAGE_KEY);

export const handleRoleResponse = (
  action: RoleResponse,
  setRole: React.Dispatch<React.SetStateAction<Role | null>>
): void => {
  const { newRole } = action.payload;
  setRole(newRole);
};

export const createRoleRequestMessage = (role: Role): RoleRequest => {
  const message: RoleRequest = {
    type: 'roleRequest',
    payload: {
      newRole: role,
    },
  };
  return message;
};

export const useRole = (): [
  Role | null,
  React.Dispatch<React.SetStateAction<Role | null>>
] => {
  const [roleSent, setRoleSent] = useState(false);
  const [role, setRole] = usePersistRole<Role | null>(null);
  const sendMessage = useSendMessage();

  useEffect(() => {
    if (role && !roleSent) {
      sendMessage(createRoleRequestMessage(role));
      setRoleSent(true);
      console.log('sending initial role:', role);
    }
  }, [role, roleSent, sendMessage]);

  return [role, setRole];
};
