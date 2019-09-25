import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import HeadsetMic from '@material-ui/icons/PermPhoneMsg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  phoneText: {
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
  const { phoneText } = useStyles();
  return (
    <Box>
      <Button disableRipple>
        <HeadsetMic color="secondary" />
        <Box className={phoneText}>
          <Typography component="span" variant="caption">
            Call now
          </Typography>
          <Typography component="span" variant="subtitle1">
            {number}
          </Typography>
        </Box>
      </Button>
    </Box>
  );
};

FeaturedPhoneNumber.propTypes = {
  number: PropTypes.string.isRequired,
};

export default FeaturedPhoneNumber;
