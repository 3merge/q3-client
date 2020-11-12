import React from 'react';
import axios from 'axios';
import { get, merge } from 'lodash';
import { useLocation } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { browser } from 'q3-ui-helpers';

const sortAlphabetically = (a, b) => a.localeCompare(b);

const useSearch = (input, endpoints, sortOption) => {
  const [res, setRes] = React.useState([]);
  const [error, setError] = React.useState(null);
  const { t } = useTranslation('labels');
  const location = useLocation();

  const inLocation = (key) =>
    get(location, 'pathname', '/')
      .split('/')
      .some((item) => item === key);

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

  const customSort = (xs) => {
    const shouldSort =
      sortOption && Array.isArray(sortOption.sortBy);
    const order = shouldSort
      ? sortOption.sortBy.slice()
      : null;

    return shouldSort
      ? xs.reduce((acc, x) => {
          if (order[order.length - 1] === x) {
            order.pop();
            acc.unshift(x);
          } else {
            acc.push(x);
          }
          return acc;
        }, [])
      : xs;
  };

  const reorder = () => {
    const alphabet = Object.keys(res).sort(
      sortAlphabetically,
    );

    const customSorted = customSort(alphabet);

    const legend = sortOption?.ignoreLocation
      ? customSorted
      : customSorted.sort((a) => (inLocation(a) ? -1 : 0));

    return Object.values(res).reduce((acc, curr, i) => {
      acc[legend[i]] = curr;
      return acc;
    }, {});
  };

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
    result: reorder(),
    error,
    lastSearch: browser.proxyLocalStorageApi(
      'getItem',
      input,
    ),
  };
};

export default useSearch;
