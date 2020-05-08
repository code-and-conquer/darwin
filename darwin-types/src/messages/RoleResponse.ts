import { Message } from './Message';
import Role from '../Role';

export interface RoleResponse extends Message {
  type: 'roleResponse';
  payload: {
    newRole: Role;
  };
}
