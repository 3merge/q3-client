import React from 'react';
import { get } from 'lodash';
import { navigate } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from './state';
import {
  getActiveSearchQueryByKey,
  getCustomFilters,
} from './withSearch';

export default (search) => {
  const {
    collectionName,
    segments = {},
    rootPath,
  } = React.useContext(Definitions);

  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'profile.filters', {});
  const items = get(filters, collectionName, {});

  const active = getActiveSearchQueryByKey(search)({
    ...items,
    ...segments,
  });

  const main = items.default;

  const updateFiltersInProfile = (newFilterObj, done) => {
    const master = { ...filters };
    master[collectionName] = newFilterObj;

    return update(
      {
        filters: master,
      },
      done,
    );
  };

  const pushInto = (name, value) => {
    const copy = { ...items };
    copy[name] = value;
    return copy;
  };

  const pullFrom = (name) => {
    const copy = { ...items };
    delete copy[name];
    return copy;
  };

  return {
    add: (name) =>
      updateFiltersInProfile(pushInto(name, search)),

    favourite: (name) =>
      updateFiltersInProfile(pushInto('default', name)),

    remove: (name) =>
      updateFiltersInProfile(pullFrom(name)),

    modify: (name, prevName) => (query) => {
      const goTo = () => navigate(`${rootPath}${query}`);

      return name
        ? updateFiltersInProfile(
            Object.assign(pullFrom(prevName), {
              [name]: query,
            }),
            goTo,
          )
        : goTo();
    },

    filters: [
      ...Object.entries(segments).map(([key, value]) => ({
        label: key,
        onClick: () => navigate(value),
      })),
      ...Object.entries(items)
        .map(([key, value]) => ({
          label: key,
          fromProfile: true,
          onClick: () => navigate(value),
          value,
        }))
        .filter(({ label }) => label !== 'default'),
    ],

    numberApplied: getCustomFilters(search).length,
    isActive: main === active,
    defaultQuery: {
      ...items,
      ...segments,
    }[main],
    active,
    main,
  };
};
