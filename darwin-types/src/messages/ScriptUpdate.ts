import { Message } from './Message';

export interface ScriptUpdate extends Message {
  type: 'scriptUpdate';
  payload: {
    script: string;
  };
}
