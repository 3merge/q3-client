import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import { isArray } from './utils';
import NotFound from './404';

const Collection = ({
  children,
  useResourceName,
  ...pageProps
}) => {
  const { resourceName } = pageProps;
  const url = '/';
  const urlID = ':id/*';

  if (useResourceName)
    Object.assign(pageProps, {
      collectionName: resourceName,
    });

  const getChildByType = (ComponentType, prop) =>
    isArray(children).find(
      ({ type, props }) =>
        type.name === ComponentType && props[prop] === true,
    );

  const cloneAsHigherOrder = (element) =>
    element
      ? (props = {}) =>
          React.cloneElement(
            element,
            { ...props, ...pageProps },
            element.props.children,
          )
      : null;

  const List = cloneAsHigherOrder(
    getChildByType('Page', 'index'),
  );

  const Detail = cloneAsHigherOrder(
    getChildByType('Page', 'id'),
  );

  return (
    <Router>
      {List && <List path={url} />}
      {Detail && <Detail path={urlID} />}
      <NotFound default />
    </Router>
  );
};

Collection.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  useResourceName: PropTypes.bool,
};

Collection.defaultProps = {
  useResourceName: false,
};

export default Collection;
