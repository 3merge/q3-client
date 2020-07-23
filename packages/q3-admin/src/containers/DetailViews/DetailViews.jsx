import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';

const WrappedRoute = ({ renderer: Renderer }) => (
  <Fade in>
    <div style={{ width: '100%' }}>
      <Renderer />
    </div>
  </Fade>
);

const TabsWithRouter = ({ views }) => (
  <Router primary={false} basePath="*">
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
