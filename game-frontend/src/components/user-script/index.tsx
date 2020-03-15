import React, { useState, FC } from 'react';
import Textarea from '../visual/Textarea';
import { useWebsocket } from '../../service/useWebsocketData';

const UserScript: FC = () => {
  const send = useWebsocket();
  const [userScript, setUserScript] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setUserScript(e.target.value);
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    send({
      type: 'scriptUpdate',
      payload: {
        script: userScript,
      },
    });
  };

  return (
    <form>
      <Textarea onChange={onChange}></Textarea>
      <button onClick={submit}>Send</button>
    </form>
  );
};

export default UserScript;
