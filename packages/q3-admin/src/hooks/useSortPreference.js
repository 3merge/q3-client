import React from 'react';
import { get, isString } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';

export default (
  location = {},
  collectionName = 'profile',
  defaultSortPreference = '-updatedAt',
) => {
  const clone = { ...location };
  let search = clone?.search;

  const sortPreference = `sort=${get(
    React.useContext(AuthContext),
    `state.profile.sorting.${collectionName}`,
    defaultSortPreference,
  )}`;

  if (isString(search) && sortPreference) {
    if (search.includes('sort')) {
      search = search.replace(
        /sort=([^&]*)/,
        sortPreference,
      );
    } else if (search === '?') {
      search += sortPreference;
    } else {
      search += `&${sortPreference}`;
    }
  }

  return Object.assign(
    clone,
    {
      search,
    },
    [],
  );
};
