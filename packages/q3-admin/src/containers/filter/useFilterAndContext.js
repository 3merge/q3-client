import React from 'react';
import { useFilters } from 'q3-ui-rest';
import PageState from '../../components/state';
import { isArray } from '../../components/utils';

export default (params, children) => {
  const {
    collectionName,
    fetching,
    location,
  } = React.useContext(PageState);

  const filters = useFilters({
    query: params.toString(),
    coll: collectionName,
    fields: isArray(children).map(
      (item) => item.props.name,
    ),
    location,
  });

  return {
    loading: filters.fetching || fetching,
    fields: filters.fields || {},
  };
};
