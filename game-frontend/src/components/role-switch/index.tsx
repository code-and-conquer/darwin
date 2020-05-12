import React, { FC } from 'react';
import { Role } from '@darwin/types';
import { useRole } from '../../service/game';
import RoleSwitchButton from './RoleSwitchButton';

const getRoleText = (role: Role): string =>
  role === Role.SPECTATOR ? 'zuschauen' : 'spielen';

const RoleSwitch: FC = () => {
  const role = useRole();

  const roleToRequest = role === Role.SPECTATOR ? Role.PLAYER : Role.SPECTATOR;

  return role ? (
    <RoleSwitchButton roleToRequest={roleToRequest}>
      Ich möchte {getRoleText(roleToRequest)}!
    </RoleSwitchButton>
  ) : null;
};

export default RoleSwitch;
