import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Delete as DeleteConfirmation } from 'q3-ui/dialogs';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { SplitPanel } from 'q3-ui/panel';
import graphic from '../../images/remove.png';

const PictureUpload = () => {
  const { t } = useTranslation();
  return (
    <Paper elevation={0}>
      <SplitPanel
        align="center"
        columnLeft={
          <Box my={2}>
            <Typography variant="h2" gutterBottom>
              {t('titles:caution')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('descriptions:delete')}
            </Typography>
            <DeleteConfirmation
              next={() => Promise.resolve()}
              customButton={(launch) => (
                <Button
                  onClick={launch}
                  variant="contained"
                  color="primary"
                  size="large"
                >
                  {t('labels:delete')}
                </Button>
              )}
            />
          </Box>
        }
        columnRight={
          <img src={graphic} alt="Delete resource" />
        }
      />
    </Paper>
  );
};

export default PictureUpload;
