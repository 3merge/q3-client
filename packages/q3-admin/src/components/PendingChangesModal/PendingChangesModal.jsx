import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from 'q3-ui-dialog';
import { useTranslation } from 'react-i18next';

const PendingChangesModal = ({ onReload, onDecline }) => {
  const { t } = useTranslation();
  const [int, setInt] = React.useState(0);
  const ref = React.useRef();

  const onClose = () => {
    clearInterval(ref.current);
    onDecline();
  };

  const onNext = () => {
    clearInterval(ref.current);
    onReload();
  };

  React.useEffect(() => {
    const max = 100;
    ref.current = setInterval(() => {
      setInt((v) => {
        if (v === max) {
          onNext();
          return v;
        }

        return v + 1;
      });
    }, 100);

    return () => {
      clearInterval(ref.current);
    };
  }, []);

  return (
    <Dialog
      initialValue
      onExit={onClose}
      title="changesDetected"
      renderTrigger={() => null}
      renderContent={(close) => (
        <>
          <LinearProgress
            variant="determinate"
            value={int}
          />
          <Box mb={2} mt={2}>
            <Typography gutterBottom>
              {t('descriptions:willRefresh')}
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  close();
                  onClose();
                }}
              >
                {t('labels:cancel')}
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={onNext}>
                {t('labels:reloadNow')}
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    />
  );
};

PendingChangesModal.propTypes = {
  onReload: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export default PendingChangesModal;
