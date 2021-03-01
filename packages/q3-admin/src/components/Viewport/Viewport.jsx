import React from 'react';
import PropTypes from 'prop-types';
import { browser } from 'q3-ui-helpers';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { get } from 'lodash';

const setViewportUnit = () => {
  let vh = window.innerHeight / 100;
  const menuHeight = get(
    document.getElementById('q3-appbar'),
    'offsetHeight',
  );

  if (menuHeight) vh -= menuHeight / 100;

  document
    .querySelector(':root')
    .style.setProperty('--vh', `${vh}px`);
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
    <Container
      maxWidth="xl"
      disableGutters
      component="main"
      style={{
        backgroundColor: '#FFF',
        overflow: 'hidden',
        flexWrap: 'nowrap',
        position: 'relative',
        maxHeight: 'calc(100vh - var(--vh))',
      }}
    >
      <Grid container>{children}</Grid>
    </Container>
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
