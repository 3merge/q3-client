import React from 'react';
import { useLocation } from '@reach/router';
import { includes, get } from 'lodash';
import { url } from 'q3-ui-helpers';
import { Definitions } from '../containers/state';
import useSortPreference from './useSortPreference';

const useLocationClone = () => {
  const dynamicParamsList = {
    limit: undefined,
    sort: undefined,
  };

  const { collectionName } = React.useContext(Definitions);
  const location = useLocation();

  return {
    limit(defaultLimitPreference = 25) {
      // otherwise, listen to the URL
      if (!includes(location?.search, 'limit=')) {
        dynamicParamsList.limit = defaultLimitPreference;
      }

      return this;
    },
    sort(defaultSortPrefence) {
      dynamicParamsList.sort = useSortPreference(
        collectionName,
        defaultSortPrefence,
      ).sort;

      return this;
    },
    build() {
      let search = get(location, 'search', '');

      Object.entries(dynamicParamsList).forEach(
        ([key, value]) => {
          if (value)
            search = url.replaceParamValueInSearchString(
              search,
              key,
              value,
            );
        },
      );

      return {
        ...location,
        search,
      };
    },
  };
};

export default useLocationClone;
