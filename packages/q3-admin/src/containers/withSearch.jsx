import React from 'react';
import { Location } from '@reach/router';
import { url } from 'q3-ui-helpers';

const hasReservedWord = (v) =>
  ['search', 'sort', 'page', 'limit'].some((term) =>
    v.startsWith(term),
  );

const removeQueryCharacter = (v) =>
  String(v).charAt(0) === '?'
    ? String(v).substring(1)
    : String(v);

export const matchTerms = (a, b) =>
  url.encode(a) === url.encode(b) &&
  url.decode(a) === url.decode(b);

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
            split.find((term) => matchTerms(term, filter)),
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

export default (Component) => (props) => (
  <Location>
    {({ location: { search } }) => (
      <Component
        {...props}
        search={search}
        getActive={getActiveSearchQueryByKey(search)}
        customFiltersApplied={
          getCustomFilters(search).length
        }
      />
    )}
  </Location>
);
