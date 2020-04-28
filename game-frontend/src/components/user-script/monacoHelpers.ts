import { useState, useEffect, useRef } from 'react';
import { monaco, EditorDidMount } from '@monaco-editor/react';
import monacoEditor from 'monaco-editor/esm/vs/editor/editor.api';
import editorIntellisense from './editorIntellisense';

export type MonacoInstance = typeof monacoEditor;
type Editor = monacoEditor.editor.IStandaloneCodeEditor;
type EditorRef = React.MutableRefObject<Editor | undefined>;

export const useHandleEditorRef = (): [EditorRef, EditorDidMount] => {
  const editorRef: EditorRef = useRef();
  const didMount: EditorDidMount = (_, editor) => {
    editorRef.current = editor;
  };
  return [editorRef, didMount];
};

export const useMonacoInstance = (): MonacoInstance | undefined => {
  const [monacoInstance, setMonacoInstance] = useState<MonacoInstance>();
  useEffect(() => {
    monaco.init().then(m => {
      m.languages.typescript.javascriptDefaults.setCompilerOptions({
        noLib: true,
        allowNonTsExtensions: true,
      });
      m.languages.typescript.javascriptDefaults.addExtraLib(editorIntellisense);
      setMonacoInstance(m);
    });
  }, []);
  return monacoInstance;
};

export const useSaveHotKey = (
  editorRef: EditorRef,
  save: (editor: Editor) => void
): void => {
  const monacoInstance = useMonacoInstance();
  const saveRef = useRef(save);
  const SAVE_ACTION_ID = 'DARWIN_SAVE';

  const editor = editorRef.current;
  useEffect(() => {
    if (editor && monacoInstance) {
      const editorSaveAction = editor.getAction(SAVE_ACTION_ID);
      if (!editorSaveAction || saveRef.current !== save) {
        editor.addAction({
          id: SAVE_ACTION_ID,
          label: 'Speichern',
          keybindings: [
            // eslint-disable-next-line no-bitwise
            monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KEY_S,
          ],
          run: save,
        });
        saveRef.current = save;
      }
    }
  }, [editor, save, monacoInstance]);
};
