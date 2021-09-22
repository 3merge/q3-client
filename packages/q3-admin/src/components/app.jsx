import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { Protected } from 'q3-ui-permissions';
import Graphic from 'q3-ui-assets';

const NotFound = () => (
  <Graphic icon="Missing" title="missing" />
);

export const makePath = ({
  resourceName,
  id,
  home,
  index,
}) => {
  if (home) return '/';
  if (index) return `${resourceName}`;
  if (id) return `${resourceName}/:id/*`;

  throw new Error('Path type not defined');
};

const App = ({
  pages,
  customRoutes,
  redirectPathForUnauthorizedUsers,
  children,
}) =>
  Array.isArray(pages) ? (
    <Router>
      {pages.map(
        ({ collectionName, component, ...etc }) => {
          const el = React.createElement(
            etc.home || !collectionName
              ? component
              : Protected,
            {
              ...etc,
              component,
              collectionName,
              coll: collectionName,
              path: makePath(etc),
              to: redirectPathForUnauthorizedUsers,
            },
          );

          return el;
        },
      )}
      {customRoutes}
      {children}
      <NotFound noThrow default />
    </Router>
  ) : (
    <NotFound noThrow default />
  );

App.propTypes = {
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.bool,
      id: PropTypes.bool,
      home: PropTypes.bool,
      collectionName: PropTypes.string,
      resourceName: PropTypes.string,
    }),
  ).isRequired,
  customRoutes: PropTypes.arrayOf(PropTypes.node),
  redirectPathForUnauthorizedUsers: PropTypes.string,
};

App.defaultProps = {
  customRoutes: null,
  redirectPathForUnauthorizedUsers: '/',
};

export default App;
