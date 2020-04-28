import React, { FC, useMemo } from 'react';
import {
  ControlledEditor,
  ControlledEditorOnChange,
} from '@monaco-editor/react';
import monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import { useSaveHotKey, useHandleEditorRef } from './monacoHelpers';

const editorOptions: monacoEditor.editor.IEditorConstructionOptions = {
  minimap: {
    enabled: false,
  },
};

const Editor: FC<{
  onChange: ControlledEditorOnChange;
  save: (script: string) => void;
}> = ({ onChange, save }) => {
  const [editorRef, handleEditorDidMount] = useHandleEditorRef();
  const wrappedSave = useMemo(
    () => (editor: monacoEditor.editor.ICodeEditor): void => {
      save(editor.getValue());
    },
    [save]
  );

  useSaveHotKey(editorRef, wrappedSave);

  return (
    <ControlledEditor
      onChange={onChange}
      height="100%"
      language="javascript"
      theme="dark"
      editorDidMount={handleEditorDidMount}
      options={editorOptions}
    />
  );
};

export default Editor;
