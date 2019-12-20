import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { SplitPanel } from 'q3-ui/lib/panel';
import Graphic from '../images/throw';

const Trash = (props) => {
  const { t } = useTranslation();

  return (
    <Paper elevation={0}>
      <SplitPanel
        align="center"
        columnLeft={
          <Box my={2}>
            <Typography variant="h3" gutterBottom>
              {t('titles:caution')}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {t('descriptions:delete')}
            </Typography>

            <Button variant="contained" color="primary">
              {t('labels:delete')}
            </Button>
          </Box>
        }
        columnRight={<Graphic />}
      />
    </Paper>
  );
};

export default Trash;
