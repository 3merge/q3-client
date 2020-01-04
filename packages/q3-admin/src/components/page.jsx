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
  location,
}) => {
  const url = id
    ? `/${collectionName}/${id}`
    : `/${collectionName}`;

  console.log(location);

  const state = useRest({
    key: resourceNameSingular,
    pluralized: resourceName,
    runOnInit: true,
    location,
    url,
  });

  return (
    <Context.Provider
      value={{
        id,
        collectionName,
        resourceName,
        resourceNameSingular,
        location,
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
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

Page.defaultProps = {
  id: null,
};

export default Page;
