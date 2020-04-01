import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '@reach/router';
import { Protected } from 'q3-ui-permissions';
import NotFound from './404';

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

const App = ({ pages, profile: Profile }) =>
  Array.isArray(pages) ? (
    <Router>
      {pages.map(
        ({ collectionName, component, ...etc }) => {
          const el = React.createElement(
            etc.home ? component : Protected,
            {
              ...etc,
              component,
              collectionName,
              coll: collectionName,
              path: makePath(etc),
              to: '/',
            },
          );

          return el;
        },
      )}
      {Profile && <Profile path="/profile" />}
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
  profile: PropTypes.oneOf([PropTypes.node, PropTypes.func])
    .isRequired,
};

export default App;
