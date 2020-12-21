import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from '@reach/router';
import { useFilters } from 'q3-ui-rest';
import { Definitions, FiltersStore } from '../state';

const FilterProvider = ({
  children,
  lookup,
  runOnSearch,
  runWithSearch,
}) => {
  const { collectionName } = React.useContext(Definitions);
  const location = useLocation();

  let query;

  if (runOnSearch) query = location?.search;
  if (runWithSearch) query = runWithSearch;

  const filters = useFilters({
    runOnInit: true,
    fields: lookup,
    coll: collectionName,
    location,
    query,
  });

  return (
    <FiltersStore.Provider value={filters}>
      {children}
    </FiltersStore.Provider>
  );
};

FilterProvider.defaultProps = {
  lookup: [],
};

FilterProvider.propTypes = {
  lookup: PropTypes.arrayOf(PropTypes.string),
};

export default FilterProvider;
