import React from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  useMediaQuery,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'q3-ui-locale';
import EmailEditorContext from '../EmailEditorContext';
import TreeView from '../TreeView';
import useEmailTemplates from '../useEmailTemplates';
import useStyle from './styles';
import EmailEditorWrapper from '../EmailEditorWrapper';
import EmailEditorErrorBoundary from '../EmailEditorErrorBoundary';
import EmailEditorErrorGraphic from '../EmailEditorErrorGraphic';

const CodeEditor = React.lazy(() =>
  // issues with codemirror package
  import('../CodeEditor'),
);

export const EmailEditor = () => {
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
            id="q3-email"
            className={cls.wrapper}
          >
            <Grid className={cls.root} container>
              <Grid item className={cls.sidebar}>
                <TreeView />
              </Grid>
              <Grid item className={cls.editor}>
                <React.Suspense fallback={<div />}>
                  <CodeEditor />
                </React.Suspense>
              </Grid>
            </Grid>
          </Container>
        </EmailEditorContext.Provider>
      </EmailEditorWrapper>
    </EmailEditorErrorBoundary>
  );
};

export const EmailEditorDeviceWrapper = () => {
  const { t } = useTranslation('descriptions');
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.down('md'),
  );

  return isMobile ? (
    <Alert severity="warning">
      {t('cannotAccessFromMobileDevice')}
    </Alert>
  ) : (
    <EmailEditor />
  );
};

EmailEditorDeviceWrapper.displayName = 'EmailEditor';
export default EmailEditorDeviceWrapper;
