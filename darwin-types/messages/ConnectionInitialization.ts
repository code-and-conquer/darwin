import { Message } from './Message';
import { ConnectionId } from '../Connection';

export interface ConnectionInitialization extends Message {
  type: 'connectionInitialization';
  payload: {
    connectionId: ConnectionId;
  };
}
