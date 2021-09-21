import React from 'react';
import { Container, Grid } from '@material-ui/core';
import CodeEditor from '../CodeEditor';
import EmailEditorContext from '../EmailEditorContext';
import TreeView from '../TreeView';
import useEmailTemplates from '../useEmailTemplates';
import useStyle from './styles';

const EmailEditor = () => {
  const cls = useStyle();
  const value = useEmailTemplates();

  return (
    <EmailEditorContext.Provider value={value}>
      <Container>
        <Grid container className={cls.root}>
          <Grid item>
            <TreeView />
          </Grid>
          <Grid item>
            <CodeEditor />
          </Grid>
        </Grid>
      </Container>
    </EmailEditorContext.Provider>
  );
};

export default EmailEditor;
