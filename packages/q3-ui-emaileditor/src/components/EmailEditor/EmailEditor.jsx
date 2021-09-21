import React from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import CodeEditor from '../CodeEditor';
import EmailEditorContext from '../EmailEditorContext';
import TreeView from '../TreeView';
import useEmailTemplates from '../useEmailTemplates';
import useStyle from './styles';

const EmailEditor = () => {
  const cls = useStyle();
  const { error, ready, ...rest } = useEmailTemplates();

  if (!ready) return 'NOT READY';
  if (error) return 'ERROR';

  return (
    <Box
      bgcolor="background.paper"
      height="100%"
      width="100%"
    >
      <EmailEditorContext.Provider value={rest}>
        <Container
          maxWidth="xl"
          disableGutters
          className={cls.wrapper}
        >
          <Grid
            className={cls.root}
            container
            disableGutters
          >
            <Grid item>
              <TreeView />
            </Grid>
            <Grid item xs>
              <CodeEditor />
            </Grid>
          </Grid>
        </Container>
      </EmailEditorContext.Provider>
    </Box>
  );
};

export default EmailEditor;
