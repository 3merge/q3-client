import React from 'react';
import { Grid } from '@material-ui/core';
import CodeEditorPreview from '../CodeEditorPreview';
import CodeEditorSave from '../CodeEditorSave';
import useCodeMirror from '../useCodeMirror';
import useStyle from './styles';

// eslint-disable-next-line
const Emails = ({ children }) => {
  const {
    codeMirrorRef,
    disablePreview,
    loading,
    html,
    ref,
    save,
    value,
  } = useCodeMirror();
  const cls = useStyle();

  return (
    <Grid className={cls.root} container>
      <Grid item zeroMinWidth className={cls.column}>
        <textarea
          className={cls.textarea}
          // allows us to manipulate text editor in tests
          data-test={codeMirrorRef.current}
          data-value={value}
          ref={ref}
        />
        <CodeEditorSave onClick={save} />
      </Grid>
      <CodeEditorPreview
        disable={disablePreview}
        html={html}
        loading={loading}
      />
    </Grid>
  );
};

export default Emails;
