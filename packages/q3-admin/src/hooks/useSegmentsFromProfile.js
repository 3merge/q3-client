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
    'default',
  ]);

  const replaceProfileFilters = (replacementData, done) =>
    update(
      {
        filters: {
          ...filters,
          [collectionName]: replacementData,
        },
      },
      done,
    );

  return {
    // operates as add and replace
    set: (name) =>
      replaceProfileFilters({
        ...data,
        [name]: search,
      }),

    // operates as add and replace
    rename: (name, prevName) =>
      replaceProfileFilters({
        ...omit(data, [prevName]),
        [name]: search,
      }),

    remove: (name) =>
      replaceProfileFilters({
        ...omit(data, [name]),
      }),

    asArray: mapSegmentsToListData(data).map((item) => ({
      ...item,
      fromProfile: true,
    })),

    asObject: data,
  };
};
