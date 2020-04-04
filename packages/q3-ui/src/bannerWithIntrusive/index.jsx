import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Image from 'gatsby-image';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  panel: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginTop: '-20vh',
    maxWidth: '80%',
    position: 'relative',
    zIndex: 10,
    '&::before': {
      borderRadius: 5,
      backgroundColor: '#FFF',
      content: '""',
      display: 'block',
      position: 'absolute',
      left: '-10000px',
      right: 0,
      top: 0,
      bottom: 0,
      boxShadow: theme.shadows[2],
    },
  },
  heroImg: {
    maxHeight: 550,
    minHeight: 475,
    height: '45vh',
    width: '100%',
  },
}));

const BannerWithIntrusive = ({
  title,
  subtitle,
  fluid,
  children,
}) => {
  const { heroImg, panel } = useStyle();

  return (
    <Box
      component="header"
      position="relative"
      width="100%"
    >
      <Image
        className={heroImg}
        fluid={fluid}
        objectPosition="center center"
        objectFit="cover"
      />
      <Container maxWidth="lg">
        <Paper elevation={0} className={panel}>
          <Box p={3} py={4} position="relative">
            <Typography variant="h1">{title}</Typography>
            <Box my={1}>
              <Divider />
            </Box>
            <Typography variant="body2">
              {subtitle}
            </Typography>
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

BannerWithIntrusive.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  fluid: PropTypes.shape({
    src: PropTypes.string,
  }).isRequired,
  children: PropTypes.node,
};

BannerWithIntrusive.defaultProps = {
  children: null,
};

export default BannerWithIntrusive;
