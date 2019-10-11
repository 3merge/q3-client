import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import {
  red,
  orange,
  green,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    paddingLeft: theme.spacing(2),
    textAlign: 'left',
  },
  error: {
    backgroundColor: red[50],
    border: `1px solid ${red[100]}`,
    color: red[900],
  },
  warning: {
    backgroundColor: orange[50],
    border: `1px solid ${orange[100]}`,
    color: orange[900],
  },
  success: {
    backgroundColor: green[50],
    border: `1px solid ${green[100]}`,
    olor: green[900],
  },
}));

const Alert = ({ label, type }) => {
  const [dismissed, setDismissed] = React.useState(false);
  const cls = useStyles();
  const { t } = useTranslation();

  const onDismiss = React.useCallback(() => {
    setDismissed(true);
  }, []);

  return (
    !dismissed && (
      <Box
        role="alert"
        className={classNames(cls.container, cls[type])}
      >
        <Grid
          container
          spacing={3}
          alignItems="center"
          justify="space-between"
        >
          <Grid item>
            <Typography>
              {t(`notifications:${label}`)}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              onClick={onDismiss}
              aria-label={t('labels:dismiss')}
              color="primary"
            >
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

Alert.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'warning', 'success']),
};

Alert.defaultProps = {
  type: 'error',
};

export default Alert;
