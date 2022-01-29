import React from 'react';
import { get, set } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';

export default (
  collectionName = 'profile',
  defaultSortPreference = '-updatedAt',
) => {
  const { state, update } = React.useContext(AuthContext);

  const updateSortPrefence = (sort) => {
    const sorting = get(state, 'profile.sorting', {});
    set(sorting, collectionName, sort);

    return update({
      sorting,
    });
  };

  return {
    sort: get(
      state,
      `profile.sorting.${collectionName}`,
      defaultSortPreference,
    ),

    update: updateSortPrefence,
  };
};
