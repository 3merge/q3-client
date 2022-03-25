import React from 'react';
import { omit, get, isObject } from 'lodash';
import { useLocation } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { useTranslation } from 'q3-ui-locale';
import { useQueryParams } from 'q3-ui-queryparams';
import { mapSegmentsToListData } from './useSegments';

export default (collectionName, options = {}) => {
  const { search } = useLocation();
  const { t } = useTranslation('descriptions');
  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'profile.filters', {});
  const qp = useQueryParams();

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
      if (!name) {
        return Promise.resolve(null);
      }

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

      let currentSearch = search;

      if (options?.ui === 'calendar') {
        const { fromKey = 'date', toKey } = options;
        const decoded = omit(qp.decode(search), [
          `${fromKey}>`,
          `${fromKey}<`,
          `${toKey}>`,
          `${toKey}<`,
          'sort',
          'limit',
        ]);

        // eslint-disable-next-line
        alert(t('calendarSegments'));
        currentSearch = qp.encode(decoded);
      }

      return replaceProfileFilters({
        ...data,
        [name]: currentSearch,
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
