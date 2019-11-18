import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import HeadsetMic from '@material-ui/icons/PermPhoneMsg';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    lineHeight: 1,
    marginLeft: theme.spacing(1),
    textAlign: 'left',
    '&>span': {
      display: 'block',
      lineHeight: 1.1,
      '&:last-child': {
        fontWeight: 'bold',
      },
    },
  },
}));

const FeaturedPhoneNumber = ({ number }) => {
  const { root } = useStyles();
  const { t } = useTranslation();
  const label = t('labels:call');

  if (!number) return null;

  const opts = {
    component: 'a',
    href: `tel:${number}`,
  };

  return (
    <Box>
      <Hidden xsDown>
        <Button {...opts} disableRipple>
          <HeadsetMic color="secondary" />
          <Box className={root}>
            <Typography
              component="span"
              variant="overline"
              color="primary"
            >
              {label}
            </Typography>
            <Typography component="span" variant="body1">
              {number}
            </Typography>
          </Box>
        </Button>
      </Hidden>
      <Hidden smUp>
        <IconButton
          {...opts}
          aria-label={label}
          color="inherit"
        >
          <HeadsetMic />
        </IconButton>
      </Hidden>
    </Box>
  );
};

FeaturedPhoneNumber.propTypes = {
  number: PropTypes.string,
  hideIcon: PropTypes.bool,
};

FeaturedPhoneNumber.defaultProps = {
  number: null,
  hideIcon: false,
};

export default FeaturedPhoneNumber;
