import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  alignOnMobile: {
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left',
    },
  },
}));

const Featured = ({ title, subtitle, label, margin }) => {
  const { alignOnMobile } = useStyles();
  return (
    <Container maxWidth="md" align="center" className={alignOnMobile}>
      <Box mb={8} px={4} pt={margin ? 8 : 0}>
        <Typography variant="overline" gutterBottom color="secondary">
          {label}
        </Typography>
        <Typography variant="h2" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {subtitle}
        </Typography>
      </Box>
    </Container>
  );
};

Featured.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Featured;
