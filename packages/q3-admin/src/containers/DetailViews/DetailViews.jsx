import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import { Fade, Paper, Box } from '@material-ui/core';

export const WrappedRoute = ({ children, disablePaper }) =>
  disablePaper ? (
    <Fade in>
      <Box>{children}</Box>
    </Fade>
  ) : (
    <Fade in>
      <Paper elevation={1}>
        <Box p={2}>{children}</Box>
      </Paper>
    </Fade>
  );

WrappedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  disablePaper: PropTypes.bool,
};

WrappedRoute.defaultProps = {
  children: null,
  disablePaper: false,
};

const TabsWithRouter = ({ views, ...etc }) => (
  <Router primary={false}>
    {views.map(({ component: Comp, to }) => (
      <WrappedRoute {...etc} path={to} key={to}>
        <Comp default />
      </WrappedRoute>
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
