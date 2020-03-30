import React, { FC } from 'react';
import {
  ControlledEditor,
  ControlledEditorOnChange,
} from '@monaco-editor/react';
import { useSaveHotKey, useHandleEditorRef } from './monaco-helper';

const Editor: FC<{
  onChange: ControlledEditorOnChange;
  save: () => void;
}> = ({ onChange, save }) => {
  const [editorRef, handleEditorDidMount] = useHandleEditorRef();

  useSaveHotKey(editorRef, save);

  return (
    <ControlledEditor
      onChange={onChange}
      height="100%"
      language="javascript"
      theme="dark"
      editorDidMount={handleEditorDidMount}
    />
  );
};

export default Editor;
