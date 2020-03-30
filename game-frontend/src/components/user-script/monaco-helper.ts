import { useState, useEffect, useRef } from 'react';
import { monaco, EditorDidMount } from '@monaco-editor/react';
import monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';

export type MonacoInstance = typeof monacoEditor;
type EditorRef = React.MutableRefObject<
  monacoEditor.editor.IStandaloneCodeEditor | undefined
>;
export const useHandleEditorRef = (): [EditorRef, EditorDidMount] => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor>();
  const didMount: EditorDidMount = (_, editor) => {
    editorRef.current = editor;
  };
  return [editorRef, didMount];
};

export const useMonacoInstance = (): MonacoInstance | undefined => {
  const [monacoInstance, setMonacoInstance] = useState<MonacoInstance>();
  useEffect(() => {
    monaco.init().then(m => {
      setMonacoInstance(m);
    });
  }, []);
  return monacoInstance;
};

export const useSaveHotKey = (editorRef: EditorRef, save: () => void): void => {
  const monacoInstance = useMonacoInstance();

  useEffect(() => {
    if (editorRef && editorRef.current && monacoInstance) {
      const m = monacoInstance as MonacoInstance;
      editorRef.current.addAction({
        // An unique identifier of the contributed action.
        id: 'saveAndUpload',

        // A label of the action that will be presented to the user.
        label: 'Speichern und Hochladen',

        // eslint-disable-next-line no-bitwise
        keybindings: [m.KeyMod.CtrlCmd | m.KeyCode.KEY_S],
        run: save,
      });
    }
  }, [editorRef, save, monacoInstance]);
};
