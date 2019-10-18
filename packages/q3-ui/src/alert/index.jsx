import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { Link } from '@reach/router';
import MULink from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Close from '@material-ui/icons/Close';
import Hidden from '@material-ui/core/Hidden';
import {
  red,
  orange,
  green,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginLeft: theme.spacing(1),
  },
  container: {
    display: 'flex',
    boxSizing: 'border-box',
    maxWidth: '100%',
    padding: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
    },
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

const Alert = ({ label, link, type, done }) => {
  const [dismissed, setDismissed] = React.useState(false);
  const cls = useStyles();
  const { t } = useTranslation();

  const onDismiss = React.useCallback(() => {
    setDismissed(true);
    if (done) done();
  }, []);

  return (
    <Collapse in={!dismissed}>
      <Box
        role="alert"
        className={classNames(cls.container, cls[type])}
        component="p"
      >
        <div>
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
        </div>

        <Button onClick={onDismiss} color="inherit">
          <Hidden smDown>{t('labels:ok')}</Hidden>
          <Close className={cls.icon} />
        </Button>
      </Box>
    </Collapse>
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
