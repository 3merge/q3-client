import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Delete as DeleteConfirmation } from 'q3-ui/lib/dialogs';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { SplitPanel } from 'q3-ui/lib/panel';
import graphic from '../images/remove.png';

const Trash = (props) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState();

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

            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              color="primary"
              size="large"
            >
              {t('labels:delete')}
            </Button>

            <DeleteConfirmation
              isOpen={open}
              close={() => setOpen(false)}
              {...props}
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

export default Trash;
