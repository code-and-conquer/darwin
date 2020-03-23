import { Message } from './Message';
import { UserId } from '../UserContext';

export interface ConnectionInitialization extends Message {
  type: 'connectionInitialization';
  payload: {
    userId: UserId;
  };
}
