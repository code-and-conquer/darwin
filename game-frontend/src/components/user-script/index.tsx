import React, { useState, FC, useEffect, useCallback } from 'react';
import {
  ControlledEditor,
  ControlledEditorOnChange,
} from '@monaco-editor/react';
import monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import Container from './Container';
import SaveButton from './SaveButton';
import { useSendMessage } from '../../service/game';
import { ScriptUpdate } from '../../../../darwin-types/messages/ScriptUpdate';

const UserScript: FC = () => {
  const send = useSendMessage();
  const [userScript, setUserScript] = useState('');
  const [editorRef, setEditorRef] = useState(null);

  const onChange: ControlledEditorOnChange = (
    ev: monacoEditor.editor.IModelContentChangedEvent,
    value: string | undefined
  ): void => {
    setUserScript(value as string);
  };

  const submit = (e: any): void => {
    e.preventDefault();

    const scriptUpdate: ScriptUpdate = {
      type: 'scriptUpdate',
      payload: {
        script: userScript,
      },
    };

    send(scriptUpdate);
  };

  const handleEditorDidMount = (_: any, editor: any) => {
    setEditorRef(editor);
  };

  useEffect(() => {
    if (editorRef) {
      (editorRef as any).addAction({
        // An unique identifier of the contributed action.
        id: 'my-unique-id',

        // A label of the action that will be presented to the user.
        label: 'My Label!!!',

        // An optional array of keybindings for the action.
        keybindings: [2048 | 49],

        // A precondition for this action.
        precondition: null,

        // A rule to evaluate on top of the precondition in order to dispatch the keybindings.
        keybindingContext: null,

        contextMenuGroupId: 'navigation',

        contextMenuOrder: 1.5,

        // Method that will be executed when the action is triggered.
        // @param editor The editor instance is passed in as a convinience
        run: () => {
          submit({ preventDefault: () => {} });
          return null;
        },
      });
    }
  }, [editorRef]);

  return (
    <Container data-testid="user-script-form">
      <form>
        <ControlledEditor
          onChange={onChange}
          height="80vh"
          language="javascript"
          theme="dark"
          editorDidMount={handleEditorDidMount}
        />
        <SaveButton onClick={submit}>Speichern</SaveButton>
      </form>
    </Container>
  );
};

export default UserScript;
