import React from 'react';
import { useFilters } from 'q3-ui-rest';
import PageState from '../state';
import { mapByName } from './utils';

export default (params, children) => {
  const {
    collectionName,
    fetching,
    location,
  } = React.useContext(PageState);

  const filters = useFilters({
    query: params.toString(),
    fields: mapByName(children),
    coll: collectionName,
    location,
  });

  return {
    loading: filters.fetching || fetching,
    fields: filters.fields || {},
  };
};
