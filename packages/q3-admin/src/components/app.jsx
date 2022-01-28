import React from 'react';
import PropTypes from 'prop-types';
import { first } from 'lodash';
import { Router, Redirect } from '@reach/router';
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
  if (!resourceName)
    throw new Error(
      'Cannot build path without a "resourceName" value',
    );

  if (index) return `${resourceName}`;
  if (id) return `${resourceName}/:id/*`;

  throw new Error('Path type not defined');
};

export const addRedirectWhenMissingHome = (xs) => {
  if (xs.findIndex((f) => f.home) === -1)
    return [
      {
        home: true,
        component: () => (
          <Redirect noThrow to={makePath(first(xs))} />
        ),
      },
    ].concat(xs);

  return xs;
};

const App = ({ pages, paths, children }) =>
  Array.isArray(pages) ? (
    <Router>
      {addRedirectWhenMissingHome(pages.flat()).map(
        ({ collectionName, component, ...etc }, idx) => {
          const path = makePath(etc);
          const el = React.createElement(
            etc.home || !collectionName
              ? component
              : Protected,
            {
              ...etc,
              component,
              collectionName,
              coll: collectionName,
              path,
              key: `path-${idx}`,
              // back to index
              to: '/',
            },
          );

          return el;
        },
      )}
      {paths}
      {children}
      <NotFound noThrow default />
    </Router>
  ) : (
    <NotFound noThrow default />
  );

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  paths: PropTypes.arrayOf(PropTypes.node),
  pages: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({
        index: PropTypes.bool,
        id: PropTypes.bool,
        home: PropTypes.bool,
        collectionName: PropTypes.string,
        resourceName: PropTypes.string,
      }),
    ]),
  ).isRequired,
};

App.defaultProps = {
  paths: undefined,
  children: null,
};

export default App;
