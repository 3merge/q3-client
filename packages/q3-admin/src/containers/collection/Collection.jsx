import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useCollection, useSegments } from 'q3-hooked';
import { Definitions, Options } from '../state';

const Collection = ({ children, options, ...args }) => {
  const { hasMounted, ...value } = useCollection(args);

  const {
    ensureFavourite,
    hasAppliedFavouriteSegment,
  } = useSegments();

  React.useEffect(() => {
    if (hasMounted) ensureFavourite();
  }, [hasMounted]);

  return hasMounted && hasAppliedFavouriteSegment ? (
    <Definitions.Provider value={value}>
      <Options.Provider value={options}>
        {children}
      </Options.Provider>
    </Definitions.Provider>
  ) : (
    <CircularProgress />
  );
};

Collection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.node,
    PropTypes.array,
  ]).isRequired,

  options: PropTypes.shape({
    all: PropTypes.bool,
  }),
};

Collection.defaultProps = {
  options: {
    all: true,
  },
};

export default Collection;
