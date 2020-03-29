import React, { useState, FC, useEffect, useRef, useCallback } from 'react';
import {
  ControlledEditor,
  ControlledEditorOnChange,
  EditorDidMount,
} from '@monaco-editor/react';
import monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import Container from './Container';
import SaveButton from './SaveButton';
import { useSendMessage } from '../../service/game';
import { ScriptUpdate } from '../../../../darwin-types/messages/ScriptUpdate';

const UserScript: FC = () => {
  const send = useSendMessage();
  const currentUserScript = useRef('');
  const [userScript, setUserScript] = useState('');
  const [editorRef, setEditorRef] = useState<
    monacoEditor.editor.IStandaloneCodeEditor
  >();

  const onChange: ControlledEditorOnChange = (
    _ev: monacoEditor.editor.IModelContentChangedEvent,
    value: string | undefined
  ): void => {
    if (typeof value !== 'undefined') {
      setUserScript(value);
    }
  };

  const submit = useCallback(() => {
    const scriptUpdate: ScriptUpdate = {
      type: 'scriptUpdate',
      payload: {
        script: currentUserScript.current,
      },
    };

    send(scriptUpdate);
  }, [send]);

  const reactSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.preventDefault();
    submit();
  };

  const handleEditorDidMount: EditorDidMount = (_getEditorValue, editor) => {
    setEditorRef(editor);
  };

  useEffect(() => {
    currentUserScript.current = userScript;
  }, [userScript]);

  useEffect(() => {
    if (editorRef) {
      editorRef.addAction({
        // An unique identifier of the contributed action.
        id: 'my-unique-id',

        // A label of the action that will be presented to the user.
        label: 'Speichern und Hochladen',

        // An optional array of keybindings for the action.
        // TODO: flip will fix that
        // eslint-disable-next-line no-bitwise
        keybindings: [2048 | 49],

        contextMenuGroupId: 'navigation',

        contextMenuOrder: 1.5,

        // Method that will be executed when the action is triggered.
        // @param editor The editor instance is passed in as a convinience
        run: submit,
      });
    }
  }, [editorRef, submit]);

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
        <SaveButton onClick={reactSubmit}>Speichern</SaveButton>
      </form>
    </Container>
  );
};

export default UserScript;
