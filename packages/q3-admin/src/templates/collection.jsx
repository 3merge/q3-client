import React from 'react';
import { Router } from '@reach/router';
import PropTypes from 'prop-types';
import { isArray } from './utils';
import NotFound from './404';

const getChildByType = (children, ComponentType, prop) =>
  isArray(children).find(
    ({ type, props }) =>
      type.name === ComponentType && props[prop] === true,
  );

const cloneAsHigherOrder = (element) =>
  element
    ? (props = {}) =>
        React.cloneElement(
          element,
          props,
          element.props.children,
        )
    : null;

const Collection = ({
  children,
  useResourceName,
  ...pageProps
}) => {
  const { resourceName } = pageProps;
  const url = `/${resourceName}`;
  const urlID = `${url}/:id/*`;

  if (useResourceName)
    Object.assign(pageProps, {
      collectionName: resourceName,
    });

  const List = cloneAsHigherOrder(
    getChildByType(children, 'Page', 'index'),
  );

  const Detail = cloneAsHigherOrder(
    getChildByType(children, 'Page', 'id'),
  );

  return (
    <Router>
      {List && <List path={url} {...pageProps} />}
      {Detail && <Detail path={urlID} {...pageProps} />}
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
