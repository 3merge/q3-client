import React from 'react';
import { get } from 'lodash';
import { navigate, useLocation } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from '../context';

const startsWithQuestionMark = (str) =>
  typeof str === 'string' && str.startsWith('?');

const hasReservedWord = (v) =>
  [
    'search',
    'sort',
    'page',
    'limit',
    'active',
  ].some((term) => v.startsWith(term));

const removeQueryCharacter = (v) =>
  String(v).charAt(0) === '?'
    ? String(v).substring(1)
    : String(v);

export const getCustomFilters = (search) =>
  search
    ? removeQueryCharacter(search)
        .split('&')
        .filter((v) => !hasReservedWord(v))
    : [];

export const getActiveSearchQueryByKey = (search) => (
  items,
) => {
  const split = getCustomFilters(search);

  const matches = Object.entries(items).reduce(
    (acc, [label, query]) =>
      removeQueryCharacter(query)
        .split('&')
        .every(
          (filter) =>
            hasReservedWord(filter) ||
            split.find((term) => {
              return term === filter;
            }),
        )
        ? acc.concat(label)
        : acc,
    [],
  );

  return matches.reduce((acc, next) => {
    const previousLength = getCustomFilters(items[acc]);
    const nextLength = getCustomFilters(items[next]);
    return nextLength > previousLength ? next : acc;
  }, '');
};

export default (search) => {
  const {
    id,
    collectionName,
    segments = {},
    rootPath,
  } = React.useContext(Definitions);

  const [
    hasAppliedFavouriteSegment,
    setHasAppliedFavouriteSegment,
  ] = React.useState(false);
  const { state, update } = React.useContext(AuthContext);
  const filters = get(state, 'profile.filters', {});
  const items = get(filters, collectionName, {});

  const active = getActiveSearchQueryByKey(search)({
    ...items,
    ...(typeof segments === 'function'
      ? segments()
      : segments),
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

  const location = useLocation();
  const defaultQuery = {
    ...items,
    ...segments,
  }[main];

  const q = new URLSearchParams(defaultQuery);

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
        searchValue: value,
        value,
      })),
      ...Object.entries(items)
        .map(([key, value]) => ({
          label: key,
          fromProfile: true,
          searchValue: value,
          value,
        }))
        .filter(({ label }) => label !== 'default'),
    ],

    numberApplied: getCustomFilters(search).length,
    isActive: main === active,
    defaultQuery,
    active,
    main,
    hasAppliedFavouriteSegment,

    ensureFavourite: () =>
      (!(
        startsWithQuestionMark(location?.search) ||
        location?.state?.segments ||
        id ||
        !defaultQuery
      )
        ? navigate(defaultQuery, {
            state: {
              ...location?.state,
              segments: true,
            },
          })
        : Promise.resolve()
      ).then(() => {
        setHasAppliedFavouriteSegment(true);
      }),
  };
};
/**
import React from 'react';
import { navigate, useLocation } from '@reach/router';
import { get } from 'lodash';
import { AuthContext } from 'q3-ui-permissions';

export default (props = {}) => {
  const { state } = React.useContext(AuthContext);
  const location = useLocation();

  const {
    id,
    defaultSortPreference = '-updatedAt',
    collectionName,
  } = props;

  const sortPreference = get(
    state,
    `profile.sorting.${collectionName}`,
    defaultSortPreference,
  );

  const q = new URLSearchParams(
    get(location, 'search', ''),
  );

  const sort = q.get('sort');
  const skip = id || sort === sortPreference;

  if (skip) return;

  q.set('sort', sortPreference);
  return navigate(
    `?${q.toString().replace(/\+/g, '%20')}`,
    {
      state: {
        ...location?.state,
        sorting: true,
      },
    },
    {
      replace: true,
    },
  );
};



 */
