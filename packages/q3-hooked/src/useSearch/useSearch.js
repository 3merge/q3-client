import React from 'react';
import axios from 'axios';
import { get, merge } from 'lodash';
import { useLocation, navigate } from '@reach/router';
import { useTranslation } from 'react-i18next';

const useSearch = (endpoints) => {
  const [res, setRes] = React.useState([]);
  const { t } = useTranslation('labels');
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('search');

  const inLocation = (key) =>
    get(location, 'pathname', '/')
      .split('/')
      .some((item) => item === key);

  const handleAxiosRequest = (url) =>
    axios.get(url, {
      params: {
        search: query,
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

  const reorder = () => {
    const legend = Object.keys(res)
      .sort((a, b) => a.localeCompare(b))
      .sort((a) => (inLocation(a) ? -1 : 0));

    return Object.values(res).reduce((acc, curr, i) => {
      acc[legend[i]] = curr;
      return acc;
    }, {});
  };

  React.useEffect(() => {
    executeOnAllEndpoints().then((r) => {
      const target = r.reduce(merge, {});
      const searchResults = Object.entries(target).reduce(
        (acc, [collectionName, collectionResults = []]) => {
          acc[collectionName] = collectionResults.map(
            assignSearchPropertiesByCollectionName(
              collectionName,
            ),
          );

          return acc;
        },
        {},
      );

      setRes(searchResults);
    });
  }, [query]);

  return reorder();
};

export default useSearch;
