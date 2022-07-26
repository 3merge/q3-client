import React from 'react';
import {
  Container,
  Box,
  Button,
  Typography,
} from '@material-ui/core';
import WarningIcon from '@material-ui/icons/Warning';
import { useTranslation } from 'q3-ui-locale';
import useSaveAs from '../useSaveAs';
import useStyle from './styles';

const DocumentViewerError = (props) => {
  const cls = useStyle();
  const { t } = useTranslation('descriptions');
  const save = useSaveAs(props);

  return (
    <Container maxWidth="xs">
      <Box textAlign="center">
        <Box display="inline-block" mb={0.5}>
          <WarningIcon className={cls.icon} />
        </Box>
        <Typography className={cls.text} variant="body2">
          {t('couldNotGenerateFilePreview')}
        </Typography>
        <Box mt={2}>
          <Button
            color="secondary"
            onClick={save}
            variant="contained"
          >
            {t('labels:download')}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default DocumentViewerError;
