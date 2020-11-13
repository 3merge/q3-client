import React from 'react';
import axios from 'axios';
import { get, merge } from 'lodash';
import { useTranslation } from 'react-i18next';
import { browser } from 'q3-ui-helpers';

const comparesTo = (a, b) => a.localeCompare(b);

const getPathname = (location) =>
  get(location, 'pathname', '/').split('/');

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
      pathname.some((x) => x === a) ? -1 : 0,
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

const useSearch = (input, endpoints) => {
  const [res, setRes] = React.useState([]);
  const [error, setError] = React.useState(null);
  const { t } = useTranslation('labels');

  const handleAxiosRequest = (url) =>
    axios.get(url, {
      params: {
        search: input,
      },
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
    executeOnAllEndpoints()
      .then((r) => {
        const target = r.reduce(merge, {});
        const searchResults = Object.entries(target).reduce(
          (
            acc,
            [collectionName, collectionResults = []],
          ) => {
            acc[collectionName] = collectionResults.map(
              assignSearchPropertiesByCollectionName(
                collectionName,
              ),
            );

            return acc;
          },
          {},
        );
        browser.proxyLocalStorageApi('setItem', input);
        setRes(searchResults);
      })
      .catch(setError);
  }, [input]);

  return {
    Collections: CustomSort.of(res),
    error,
    lastSearch: browser.proxyLocalStorageApi(
      'getItem',
      input,
    ),
  };
};

export default useSearch;
