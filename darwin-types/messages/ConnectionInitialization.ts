import { Message } from './Message';
import { ConnectionId } from '../../game-backend/src/ServerStore';

export interface ConnectionInitialization extends Message {
  type: 'connectionInitialization';
  payload: {
    connectionId: ConnectionId;
  };
}
