import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { Link } from '@reach/router';
import MULink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  red,
  orange,
  green,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(1),
  },
  container: {
    display: 'flex',
    padding: `${theme.spacing(1)} ${theme.spacing(
      1,
    )} ${theme.spacing(1)} ${theme.spacing(2)}`,
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
    color: green[900],
  },
  info: {
    border: `1px solid ${theme.palette.primary.dark}`,
    backgroundColor: theme.palette.primary.main,
    color: '#FFF',
  },
}));

const Alert = ({ label, link, type }) => {
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
            <Typography color="inherit">
              {t(`descriptions:${label}`)}
              {link && (
                <MULink
                  component={Link}
                  to={link}
                  className={cls.icon}
                  style={{ textDecoration: 'underline' }}
                  color="inherit"
                >
                  {t('labels:learn')}
                </MULink>
              )}
            </Typography>
          </Grid>
          <Grid item>
            <Button onClick={onDismiss} color="inherit">
              {t('labels:ok')}
              <Close className={cls.icon} />
            </Button>
          </Grid>
        </Grid>
      </Box>
    )
  );
};

Alert.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'error',
    'warning',
    'success',
    'info',
  ]),
};

Alert.defaultProps = {
  type: 'info',
};

export default Alert;
