import React, { useState, FC, useMemo } from 'react';
import { ControlledEditorOnChange } from '@monaco-editor/react';
import { ScriptUpdate } from '@darwin/types';
import Container from './Container';
import SaveButton from './SaveButton';
import { useSendMessage } from '../../service/game';
import Editor from './Editor';

const UserScript: FC = () => {
  const sendMessage = useSendMessage();
  const [userScript, setUserScript] = useState('');

  const saveScript = useMemo(
    () => (script: string): void => {
      const scriptUpdate: ScriptUpdate = {
        type: 'scriptUpdate',
        payload: {
          script,
        },
      };
      sendMessage(scriptUpdate);
    },
    [sendMessage]
  );

  const onClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    saveScript(userScript);
  };

  const onChange: ControlledEditorOnChange = (_, value) => {
    setUserScript(value || '');
  };

  return (
    <Container data-testid="user-script-form">
      <form>
        <Editor onChange={onChange} save={saveScript} />
        <SaveButton onClick={onClick}>Speichern</SaveButton>
      </form>
    </Container>
  );
};

export default UserScript;
