import React from 'react';
import PropTypes from 'prop-types';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '1rem 0',
    '&::before': {
      color: grey[400],
      content: 'open-quote',
      display: 'block',
      fontFamily: 'auto',
      fontSize: '132px',
      lineHeight: 0,
      paddingBottom: theme.spacing(1),
    },
  },
  cite: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    margin: 0,
    '& > small': {
      fontWeight: '200',
    },
  },
}));

const Testimonial = ({ quote, person, position }) => {
  const { root, cite } = useStyles();
  return (
    <Box p={2} my={1}>
      <Typography
        component="blockquote"
        variant="body2"
        className={root}
      >
        {quote}
      </Typography>
      <Typography
        component="cite"
        variant="h4"
        className={cite}
      >
        {person}
        <br />
        <small>&mdash;{position}</small>
      </Typography>
    </Box>
  );
};

Testimonial.propTypes = {
  quote: PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
};

export default Testimonial;
