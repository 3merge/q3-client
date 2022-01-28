import React from 'react';
import { omit, get } from 'lodash';
import { useLocation } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { mapSegmentsToListData } from './useSegments';

export default (collectionName) => {
  const { search } = useLocation();
  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'profile.filters', {});

  const data = omit(get(filters, collectionName, {}), [
    // no longer need support for "favourited" segments
    'default',
  ]);

  const replaceProfileFilters = (replacementData) =>
    update({
      filters: {
        ...filters,
        [collectionName]: replacementData,
      },
    });

  return {
    set: (name) =>
      replaceProfileFilters({
        ...data,
        [name]: search,
      }),

    rename: (name, prevName) =>
      replaceProfileFilters({
        ...omit(data, [prevName]),
        [name]: data[prevName],
      }),

    remove: (name) =>
      replaceProfileFilters({
        ...omit(data, [name]),
      }),

    asArray: mapSegmentsToListData(data).map((item) => ({
      ...item,
      fromProfile: true,
    })),
  };
};
