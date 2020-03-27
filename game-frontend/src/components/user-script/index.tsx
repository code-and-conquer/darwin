import React, { useState, FC } from 'react';
// import ReactDOM from 'react-dom';
import Editor from '@monaco-editor/react';
// import Textarea from '../visual/Textarea';
import Container from './Container';
import SaveButton from './SaveButton';
import { useSendMessage } from '../../service/game';
import { ScriptUpdate } from '../../../../darwin-types/messages/ScriptUpdate';

const UserScript: FC = () => {
  const send = useSendMessage();
  const [userScript, setUserScript] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setUserScript(e.target.value);
  };

  const submit = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();

    const scriptUpdate: ScriptUpdate = {
      type: 'scriptUpdate',
      payload: {
        script: userScript,
      },
    };

    send(scriptUpdate);
  };

  return (
    <Container data-testid="user-script-form">
      <form>
        {/* <Textarea onChange={onChange} rows={8}></Textarea> */}
        <Editor height="50vh" language="javascript" theme="dark" />
        <SaveButton onClick={submit}>Speichern</SaveButton>
      </form>
    </Container>
  );
};

export default UserScript;
