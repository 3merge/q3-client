import React from 'react';
import PropTypes from 'prop-types';
import useRest from 'q3-ui-rest';
import Context from './state';

const Page = ({
  children,
  collectionName,
  resourceName,
  resourceNameSingular,
  id,
}) => {
  const url = id
    ? `/${collectionName}/${id}`
    : `/${collectionName}`;

  const state = useRest({
    key: resourceNameSingular,
    pluralized: resourceName,
    runOnInit: true,
    url,
  });

  return (
    <Context.Provider
      value={{
        id,
        collectionName,
        resourceName,
        resourceNameSingular,
        ...state,
      }}
    >
      {children}
    </Context.Provider>
  );
};

Page.propTypes = {
  children: PropTypes.node.isRequired,
  collectionName: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  resourceNameSingular: PropTypes.string.isRequired,
  id: PropTypes.string,
};

Page.defaultProps = {
  id: null,
};

export default Page;
