import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import useUnsavedChangesBodyAttribute from '../../hooks/useUnsavedChangesBodyAttribute';

const WrappedRoute = ({ renderer: Renderer }) => {
  useUnsavedChangesBodyAttribute();

  return (
    <Fade in>
      <div style={{ width: '100%' }}>
        <Renderer />
      </div>
    </Fade>
  );
};

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
