import { Message } from './Message';
import Role from '../Role';

export interface RoleRequest extends Message {
  type: 'roleRequest';
  payload: {
    newRole: Role;
  };
}
