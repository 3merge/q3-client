import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import { Fade, Paper, Box } from '@material-ui/core';

const WrappedRoute = ({
  disablePaper,
  renderer: Renderer,
}) =>
  disablePaper ? (
    <Fade in>
      <Box>
        <Renderer />
      </Box>
    </Fade>
  ) : (
    <Fade in>
      <Paper elevation={1}>
        <Box p={2}>
          <Renderer />
        </Box>
      </Paper>
    </Fade>
  );

WrappedRoute.propTypes = {
  disablePaper: PropTypes.bool,
  renderer: PropTypes.element.isRequired,
};

WrappedRoute.defaultProps = {
  disablePaper: false,
};

const TabsWithRouter = ({ views, ...etc }) => (
  <Router primary={false}>
    {views.map(({ component: Comp, to }) => (
      <WrappedRoute
        {...etc}
        renderer={Comp}
        path={to}
        key={to}
      />
    ))}
  </Router>
);

TabsWithRouter.propTypes = {
  views: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
};

TabsWithRouter.defaultProps = {};

export default TabsWithRouter;
