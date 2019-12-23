import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import Box from '@material-ui/core/Box';
import { Link } from '@reach/router';
import Button from '@material-ui/core/Button';
import {
  red,
  orange,
  green,
} from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  container: {
    display: 'flex',
    fontSize: '0.9rem',
    boxSizing: 'border-box',
    maxWidth: '100%',
    padding: theme.spacing(1),
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'left',
    margin: 0,
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'nowrap',
      display: 'block',
      whiteSpace: 'nowrap',
      overflow: 'auto',
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
        <span className={cls.icon}>
          {t(`descriptions:${label}`)}
        </span>
        <span>
          {link && (
            <Button
              component={Link}
              to={link}
              className={cls.icon}
              color="inherit"
              size="small"
            >
              {t('labels:learn')}
            </Button>
          )}

          <Button
            onClick={onDismiss}
            className={cls.icon}
            color="inherit"
            size="small"
          >
            {t('labels:ok')}
          </Button>
        </span>
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
