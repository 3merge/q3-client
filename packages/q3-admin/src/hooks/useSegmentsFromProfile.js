import React from 'react';
import { omit, get, isEqual } from 'lodash';
import { useNavigate } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from '../containers/state';
import { mapSegmentsToListData } from './useSegments';

export default (search) => {
  const { collectionName, rootPath } = React.useContext(
    Definitions,
  );

  const { state, update } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const filters = get(state, 'profile.filters', {});

  const { default: main, ...data } = get(
    filters,
    collectionName,
    {},
  );

  const curryNavigateOnRootPath = (to) => () =>
    navigate([rootPath, to].join(''));

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
    add: (name) =>
      replaceProfileFilters({
        ...data,
        [name]: search,
        default: main,
      }),

    favourite: (name) =>
      replaceProfileFilters({
        ...data,
        default: name,
      }),

    remove: (name) =>
      replaceProfileFilters({
        ...omit(data, [name]),
        default: main,
      }),

    modify: (name, prevName) => (query) => {
      const obj = omit(data, [prevName]);
      const next = curryNavigateOnRootPath(query);

      return name
        ? replaceProfileFilters(
            {
              ...obj,
              [name]: query,
              default: isEqual(main, prevName)
                ? name
                : main,
            },
            next,
          )
        : next();
    },

    asArray: mapSegmentsToListData(data).map((item) => ({
      ...item,
      fromProfile: true,
    })),

    asObject: data,
    main,
  };
};
