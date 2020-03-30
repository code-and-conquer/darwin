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

export const useSaveHotKey = (
  editorRef: EditorRef,
  save: (editor: monacoEditor.editor.ICodeEditor) => void
): void => {
  const monacoInstance = useMonacoInstance();
  const SAVE_ACTION_ID = 'DARWIN_SAVE';

  useEffect(() => {
    if (editorRef && editorRef.current && monacoInstance) {
      const editorSaveAction = editorRef.current.getAction(SAVE_ACTION_ID);
      if (!editorSaveAction || editorSaveAction.run !== save) {
        editorRef.current.addAction({
          id: SAVE_ACTION_ID,
          label: 'Speichern',
          keybindings: [
            // eslint-disable-next-line no-bitwise
            monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KEY_S,
          ],
          run: save,
        });
      }
    }
  }, [editorRef, save, monacoInstance]);
};
