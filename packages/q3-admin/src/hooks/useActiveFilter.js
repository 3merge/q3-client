import React from 'react';
import { get } from 'lodash';
import { useNavigate } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import { Definitions } from '../containers/state';

const isMatch = (x, y) => x === y;

const hasReservedWord = (v) =>
  [
    // 'search',
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
    collectionName,
    segments = {},
    rootPath,
  } = React.useContext(Definitions);

  const navigate = useNavigate();
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

  return {
    add: (name) =>
      updateFiltersInProfile(pushInto(name, search)),

    favourite: (name) => {
      return updateFiltersInProfile(
        pushInto('default', name),
      );
    },

    remove: (name) =>
      updateFiltersInProfile(pullFrom(name)),

    modify: (name, prevName) => (query) => {
      const goTo = () => {
        console.log('here>>>', query);
        return navigate(`${rootPath}${query}`);
      };

      return name
        ? updateFiltersInProfile(
            Object.assign(
              pullFrom(prevName),
              {
                [name]: query,
              },
              isMatch(main, prevName)
                ? { default: name }
                : {},
            ),
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
    defaultQuery: {
      ...items,
      ...segments,
    }[main],
    active,
    main,
  };
};
