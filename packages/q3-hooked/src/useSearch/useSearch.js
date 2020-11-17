import React from 'react';
import axios from 'axios';
import { get, merge } from 'lodash';
import { useTranslation } from 'react-i18next';
import { browser } from 'q3-ui-helpers';
import { useValue } from 'useful-state';
import { useDebounce } from 'use-debounce';

export const USE_SEARCH_INPUT = 'useSearchInput';

export const storePreviousSearchTerms = (value) => {
  let prev = browser.proxyLocalStorageApi(
    'getItem',
    USE_SEARCH_INPUT,
  );

  prev = Array.isArray(prev) ? prev.concat(value) : [value];

  const newValue = prev.length <= 5 ? prev : prev.slice(-5);

  browser.proxyLocalStorageApi(
    'setItem',
    USE_SEARCH_INPUT,
    newValue,
  );
};

const comparesTo = (a, b) => a.localeCompare(b);

const getPathname = (location) =>
  get(location, 'pathname', '/').split('/');

const isEqual = (x) => (y) => x === y;

export class CustomSort {
  constructor(x) {
    this._collections = Object.keys(x);
    this._value = Object.values(x);
  }

  static of(x) {
    return new CustomSort(x);
  }

  alphabetSort() {
    this._collections.sort(comparesTo);
    return this;
  }

  locationSort(location) {
    const pathname = getPathname(location);

    this._collections.sort((a) =>
      pathname.some(isEqual(a)) ? -1 : 0,
    );
    return this;
  }

  collectionSort(collections) {
    if (!Array.isArray(collections)) return this;

    const rest = this._collections.reduce((acc, x) => {
      if (!collections.includes(x)) {
        acc.push(x);
      }
      return acc;
    }, []);

    this._collections = collections.concat(rest);

    return this;
  }

  extract() {
    return this._value.reduce((acc, curr, i) => {
      acc[this._collections[i]] = curr;
      return acc;
    }, {});
  }
}

const useSearch = (endpoints, options = {}) => {
  const debounceMin = get(options, 'debounce.min', 325);
  const debounceMax = get(options, 'debounce.max', 1150);

  const { value, onChange } = useValue();
  const [results, setResults] = React.useState([]);
  const [error, setError] = React.useState(null);
  const { t } = useTranslation('labels');

  const [debounced] = useDebounce(value, debounceMin, {
    maxWait: debounceMax,
  });

  const handleAxiosRequest = (url) =>
    axios
      .get(url, {
        params: {
          search: debounced,
        },
      })
      .then(({ data }) => {
        return data;
      });

  const executeOnAllEndpoints = () =>
    Array.isArray(endpoints)
      ? Promise.all(endpoints.map(handleAxiosRequest))
      : Promise.resolve({});

  const assignSearchPropertiesByCollectionName = (
    collectionName,
  ) => (data) => ({
    title: t(`${collectionName}.title`, data),
    description: t(`${collectionName}.description`, data),
  });

  React.useEffect(() => {
    if (debounced.length)
      executeOnAllEndpoints()
        .then((r) => {
          const target = r.reduce(merge, {});
          const searchResults = Object.entries(
            target,
          ).reduce(
            (
              acc,
              [collectionName, collectionResults = []],
            ) => {
              if (Array.isArray(collectionResults))
                acc[collectionName] = collectionResults.map(
                  assignSearchPropertiesByCollectionName(
                    collectionName,
                  ),
                );

              return acc;
            },
            {},
          );
          storePreviousSearchTerms(debounced);
          setResults(searchResults);
        })
        .catch(setError);
  }, [debounced]);

  return {
    error,
    onChange,
    value,
    // we should apply custom sort to this and use hook options to customize the ordering
    // no need to expose it to the end developer otherwise
    results,
    // we should store multiple searches
    // might also be worth storing those "clicked" on instead
    lastSearch: browser.proxyLocalStorageApi(
      'getItem',
      USE_SEARCH_INPUT,
    ),

    groupBy: () => {
      return Object.entries(results).reduce(
        (acc, [key, r]) => {
          return acc.concat(
            r.map((item) => ({
              ...item,
              label: key,
            })),
          );
        },
        [],
      );
    },
  };
};

export default useSearch;
