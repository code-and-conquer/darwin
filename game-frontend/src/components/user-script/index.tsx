import React, { useState, FC, useCallback } from 'react';
import { ControlledEditorOnChange } from '@monaco-editor/react';
import Container from './Container';
import SaveButton from './SaveButton';
import { useSendMessage } from '../../service/game';
import { ScriptUpdate } from '../../../../darwin-types/messages/ScriptUpdate';
import Editor from './Editor';

const UserScript: FC = () => {
  const sendMessage = useSendMessage();
  const [userScript, setUserScript] = useState('');

  const saveScript = useCallback(() => {
    const scriptUpdate: ScriptUpdate = {
      type: 'scriptUpdate',
      payload: {
        script: userScript,
      },
    };
    sendMessage(scriptUpdate);
  }, [sendMessage, userScript]);

  const onClick = (e: React.MouseEvent): void => {
    e.preventDefault();
    saveScript();
  };

  const onChange: ControlledEditorOnChange = (_ev, value) => {
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
