import React from 'react';
import { useFilters } from 'q3-ui-rest';
import { props } from 'q3-ui-helpers';
import PageState from '../state';

export default (params, children) => {
  const {
    collectionName,
    fetching,
    location,
  } = React.useContext(PageState);

  const filters = useFilters({
    query: params.toString(),
    fields: props.mapBy(children, 'name'),
    coll: collectionName,
    location,
  });

  return React.useMemo(() => {
    if (!filters.fields) {
      filters.get();
    }

    return {
      loading: filters.fetching || fetching,
      fields: filters.fields || {},
    };
  }, [filters.fields]);
};
