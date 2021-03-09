import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const setViewportUnit = () => {
  const vh = window.innerHeight;
  document
    .querySelector(':root')
    .style.setProperty('--vh', `${vh / 100}px`);
  return vh;
};

const AppViewport = ({ children }) => {
  React.useLayoutEffect(() => {
    if (!browser.isBrowserReady()) return undefined;
    window.addEventListener('resize', setViewportUnit);
    setViewportUnit();

    return () => {
      window.removeEventListener('resize', setViewportUnit);
    };
  }, []);

  return (
    <Box bgcolor="background.default">
      <Container
        maxWidth="xl"
        disableGutters
        component="main"
        style={{
          overflow: 'hidden',
          flexWrap: 'nowrap',
          position: 'relative',
          maxHeight: '100vh',
        }}
      >
        <Grid container>{children}</Grid>
      </Container>
    </Box>
  );
};

AppViewport.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
};

export default AppViewport;
