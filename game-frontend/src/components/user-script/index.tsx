import React, { useState, FC } from 'react';
import Textarea from '../visual/Textarea';
import { useWebsocket } from '../../service/useWebsocketData';
import Container from './Container';
import SaveButton from './SaveButton';

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
    <Container data-testid="user-script-form">
      <form>
        <Textarea onChange={onChange} rows={8}></Textarea>
        <SaveButton onClick={submit}>Save</SaveButton>
      </form>
    </Container>
  );
};

export default UserScript;
