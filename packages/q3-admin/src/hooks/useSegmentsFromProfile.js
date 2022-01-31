import React from 'react';
import { omit, get, isObject } from 'lodash';
import { useLocation } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import { mapSegmentsToListData } from './useSegments';

export default (collectionName) => {
  const { search } = useLocation();
  const { t } = useTranslation('descriptions');
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
    set: (name) => {
      if (
        isObject(data) &&
        Object.values(data).findIndex(
          (v) => v === search,
        ) !== -1
      ) {
        // eslint-disable-next-line
        alert(t('cannotDuplicateSegment'));
        return Promise.resolve(null);
      }

      return replaceProfileFilters({
        ...data,
        [name]: search,
      });
    },

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
