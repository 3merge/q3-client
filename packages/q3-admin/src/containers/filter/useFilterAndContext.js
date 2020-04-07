import React from 'react';
import { useFilters } from 'q3-ui-rest';
import { props } from 'q3-ui-helpers';
import { Definitions } from '../state';

export default (params, children, includeFilters) => {
  const { collectionName, location } = React.useContext(
    Definitions,
  );

  const filters = useFilters({
    query: includeFilters ? params.toString() : null,
    fields: props.mapBy(children, 'name'),
    coll: collectionName,
    location,
  });

  return React.useMemo(() => {
    if (!filters.fields) {
      filters.get();
    }

    return {
      loading: filters.fetching,
      fields: filters.fields || {},
    };
  }, [filters.fields]);
};
