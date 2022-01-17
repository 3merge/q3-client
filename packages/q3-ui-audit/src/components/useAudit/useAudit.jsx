import React from 'react';
import { useQueryParams } from 'q3-ui-queryparams';
import useRest from 'q3-ui-rest';

export default (collectionName, id, filters = {}) => {
  const search = useQueryParams().encode({
    id,
    collectionName,
    ...filters,
  });

  const state = useRest({
    key: 'changes',
    location: {
      search,
    },
    pluralized: 'changes',
    runOnInit: false,
    url: '/audit',
  });

  React.useEffect(() => {
    if (search && search.includes('targets'))
      state.get(search);
  }, [search]);

  return state;
};
