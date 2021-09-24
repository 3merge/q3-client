import React from 'react';
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Hidden,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import CodeEditor from '../CodeEditor';
import EmailEditorContext from '../EmailEditorContext';
import TreeView from '../TreeView';
import useEmailTemplates from '../useEmailTemplates';
import useStyle from './styles';
import EmailEditorWrapper from '../EmailEditorWrapper';
import EmailEditorErrorBoundary from '../EmailEditorErrorBoundary';
import EmailEditorErrorGraphic from '../EmailEditorErrorGraphic';

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

const EmailEditor = () => {
  const cls = useStyle();
  const { error, ready, ...rest } = useEmailTemplates();

  if (!ready)
    return (
      <EmailEditorWrapper className={cls.center}>
        <CircularProgress />
      </EmailEditorWrapper>
    );

  if (error) return <EmailEditorErrorGraphic />;

  return (
    <EmailEditorErrorBoundary>
      <EmailEditorWrapper>
        <EmailEditorContext.Provider value={rest}>
          <Container
            maxWidth="xl"
            disableGutters
            className={cls.wrapper}
          >
            <MobileAlert />
            <Grid className={cls.root} container>
              <Grid item className={cls.sidebar}>
                <TreeView />
              </Grid>
              <Grid item className={cls.editor}>
                <CodeEditor />
              </Grid>
            </Grid>
          </Container>
        </EmailEditorContext.Provider>
      </EmailEditorWrapper>
    </EmailEditorErrorBoundary>
  );
};

export default EmailEditor;
