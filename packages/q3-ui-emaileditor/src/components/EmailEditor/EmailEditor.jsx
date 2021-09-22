import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Hidden,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import Graphic from 'q3-ui-assets';
import { useTranslation } from 'react-i18next';
import CodeEditor from '../CodeEditor';
import EmailEditorContext from '../EmailEditorContext';
import TreeView from '../TreeView';
import useEmailTemplates from '../useEmailTemplates';
import useStyle from './styles';

const MobileAlert = () => {
  const { t } = useTranslation('descriptions');

  return (
    <Hidden mdUp>
      <Box p={1}>
        <Alert severity="warning">
          {t('emailPreviewDisabledMobile')}
        </Alert>
      </Box>
    </Hidden>
  );
};

// eslint-disable-next-line
const Wrapper = ({ children, ...rest }) => (
  <Box
    {...rest}
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
      <Wrapper className={cls.center}>
        <CircularProgress />
      </Wrapper>
    );

  if (error)
    return (
      <Wrapper className={cls.center}>
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
          <MobileAlert />
          <Grid
            className={cls.root}
            container
            disableGutters
          >
            <Grid item className={cls.sidebar}>
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
