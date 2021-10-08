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

const App = ({ pages, children }) =>
  Array.isArray(pages) ? (
    <Router>
      {addRedirectWhenMissingHome(pages).map(
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
              // back to index
              to: '/',
            },
          );

          return el;
        },
      )}
      {children}
      <NotFound noThrow default />
    </Router>
  ) : (
    <NotFound noThrow default />
  );

App.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.bool,
      id: PropTypes.bool,
      home: PropTypes.bool,
      collectionName: PropTypes.string,
      resourceName: PropTypes.string,
    }),
  ).isRequired,
};

App.defaultProps = {
  children: null,
};

export default App;
