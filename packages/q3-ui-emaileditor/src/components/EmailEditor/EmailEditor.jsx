import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
} from '@material-ui/core';
import Graphic from 'q3-ui-assets';
import CodeEditor from '../CodeEditor';
import EmailEditorContext from '../EmailEditorContext';
import TreeView from '../TreeView';
import useEmailTemplates from '../useEmailTemplates';
import useStyle from './styles';

// eslint-disable-next-line
const Wrapper = ({ children }) => (
  <Box
    bgcolor="background.paper"
    height="100%"
    position="relative"
    width="100%"
  >
    {children}
  </Box>
);

const EmailEditor = () => {
  const cls = useStyle();
  const { error, ready, ...rest } = useEmailTemplates();

  if (!ready)
    return (
      <Wrapper>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          className={cls.transform}
        >
          <CircularProgress />
        </Box>
      </Wrapper>
    );

  if (error)
    return (
      <Wrapper>
        <Graphic icon="Code" title="emailEditorFailed" />
      </Wrapper>
    );

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default EmailEditor;
