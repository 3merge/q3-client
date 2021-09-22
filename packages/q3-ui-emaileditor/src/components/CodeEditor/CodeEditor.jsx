import React from 'react';
import { Grid } from '@material-ui/core';
import CodeEditorPreview from '../CodeEditorPreview';
import CodeEditorSave from '../CodeEditorSave';
import useCodeMirror from '../useCodeMirror';
import useStyle from './styles';

// eslint-disable-next-line
const Emails = ({ children }) => {
  const { loading, html, ref } = useCodeMirror();
  const cls = useStyle();

  return (
    <Grid className={cls.root} container wrap="nowrap">
      <Grid item zeroMinWidth className={cls.column}>
        <textarea className={cls.textarea} ref={ref} />
        <CodeEditorSave />
      </Grid>
      <CodeEditorPreview html={html} loading={loading} />
    </Grid>
  );
};

export default Emails;
