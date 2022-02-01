import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import { Fade, Box } from '@material-ui/core';

export const WrappedRoute = ({ children }) => (
  <Fade in>
    <Box p={1.5}>{children}</Box>
  </Fade>
);

WrappedRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
};

WrappedRoute.defaultProps = {
  children: null,
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
