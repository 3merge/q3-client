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
  onEnter,
  onExit,
  onInit,
}) => {
  const url = id
    ? `/${collectionName}/${id}`
    : `/${collectionName}`;

  const state = useRest({
    key: resourceNameSingular,
    pluralized: resourceName,
    runOnInit: true,
    location,
    url,
  });

  React.useEffect(() => {
    if (state.fetching && onInit) onInit();
    if (!state.fetching && onEnter) onEnter(state);
    return () => {
      if (!state.fetching && onExit) onExit(state);
    };
  }, [state.fetching]);

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
  onEnter: PropTypes.func,
  onExit: PropTypes.func,
  onInit: PropTypes.func,
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
  onExit: null,
  onEnter: null,
  onInit: null,
};

export default Page;
