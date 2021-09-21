import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/base16-dark.css';
import 'codemirror/theme/base16-light.css';
import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closetag';
import 'codemirror/addon/edit/matchtags';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/scroll/annotatescrollbar';
import 'codemirror/addon/search/matchesonscrollbar';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/mode/xml/xml';
import 'codemirror/addon/lint/lint';
import CodeEditorPreview from '../CodeEditorPreview';
import CodeEditorSave from '../CodeEditorSave';
import useCodeMirror from '../useCodeMirror';
import useStyle from './styles';

// eslint-disable-next-line
const Emails = ({ children }) => {
  const { loading, html, ref } = useCodeMirror();

  const mode = useTheme()?.palette?.type;
  const cls = useStyle({
    background:
      mode === 'light'
        ? 'rgba(2,2,2,0.1)'
        : 'rgba(255,255,255,0.1)',
  });

  return (
    <Grid container>
      <Grid item className={cls.column} xs>
        <textarea className={cls.textarea} ref={ref} />
        <CodeEditorSave />
      </Grid>
      <CodeEditorPreview html={html} loading={loading} />
    </Grid>
  );
};

export default Emails;
