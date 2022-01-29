import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import { Fade, Paper, Box } from '@material-ui/core';

const WrappedRoute = ({ renderer: Renderer }) => (
  <Fade in>
    <Paper elevation={0}>
      <Box p={2}>
        <Renderer />
      </Box>
    </Paper>
  </Fade>
);

const TabsWithRouter = ({ views }) => (
  <Router primary={false}>
    {views.map(({ component: Comp, to }) => (
      <WrappedRoute renderer={Comp} path={to} key={to} />
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
