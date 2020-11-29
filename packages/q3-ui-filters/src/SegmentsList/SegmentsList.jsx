import React from 'react';
import { get } from 'lodash';
import { Link, navigate, useLocation } from '@reach/router';
import { AuthContext } from 'q3-ui-permissions';
import QueryStringMatcher from 'q3-admin/lib/helpers/QueryStringMatcher';
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

export default ({ user, system }, update) => {
  const { search } = useLocation();

  const [
    hasAppliedFavouriteSegment,
    setHasAppliedFavouriteSegment,
  ] = React.useState(false);

  const active = getActiveSearchQueryByKey(search)({
    ...user,
    ...system,
  });

  const main = user.default;

  const pushInto = (name, value) => {
    const copy = { ...user };
    copy[name] = value;
    return copy;
  };

  const pullFrom = (name) => {
    const copy = { ...user };
    delete copy[name];
    return copy;
  };

  const location = useLocation();
  const defaultQuery = {
    ...user,
    ...system,
  }[main];

  // how do we sort this??
  const q = new URLSearchParams(defaultQuery);

  const allFilters = [
    ...Object.entries({
      All: '?active',
      ...system,
    }).map(([key, value]) => ({
      label: key,
      searchValue: value,
      value,
      redirect: navigate(value),
      renderer: (props) =>
        React.createElement(Link, {
          ...props,
          to: value,
        }),
    })),
    ...Object.entries(user)
      .map(([key, value]) => ({
        redirect: navigate(value),
        renderer: (props) =>
          React.createElement(Link, {
            ...props,
            to: value,
          }),
        label: key,
        fromProfile: true,
        searchValue: value,
        value,
      }))
      .filter(({ label }) => label !== 'default'),
  ];

  return {
    add: (name) => update(pushInto(name, search)),

    favourite: (name) => update(pushInto('default', name)),

    remove: (name) => update(pullFrom(name)),

    modify: (name, prevName) => (query) => {
      const goTo = () => navigate(`${rootPath}${query}`);

      return name
        ? update(
            Object.assign(pullFrom(prevName), {
              [name]: query,
            }),
            goTo,
          )
        : goTo();
    },

    filters: allFilters,

    numberApplied: getCustomFilters(search).length,
    isActive: main === active,
    defaultQuery,
    active,
    main,
    hasAppliedFavouriteSegment,

    ensureFavourite: () =>
      (!(
        startsWithQuestionMark(location?.search) ||
        location?.state?.system ||
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

    getCurrent: () => {
      const siblings = allFilters.map(
        (item) => item.searchValue,
      );

      const res =
        allFilters.find((item) =>
          new QueryStringMatcher(
            location.search,
            item.searchValue,
            siblings,
          ).isActive(),
        ) || allFilters[0];

      return res?.searchValue;
    },
  };
};
