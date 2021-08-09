import React from 'react';
import axios from 'axios';
import { get } from 'lodash';

export default (collection, id) => {
  const [data, setData] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [fetchingError, setFetchingError] = React.useState(
    false,
  );

  const [params, setParams] = React.useState({
    skip: 0,
  });

  const getData = () => {
    setFetching(true);

    return axios
      .get(
        `/audit?collectionName=${collection}&id=${id}&skip=${0}`,
        { params },
      )
      .then((r) => {
        setFetchingError(false);
        setData(get(r, 'data.data.changes', []));
      })
      .catch(() => {
        setFetchingError(true);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const fetchMore = () => {
    // if (hasMore) {
    // add a skip
    // }
  };

  return {
    fetching,
    fetchingError,
    fetchMore,
    hasMore: false,
    data,
  };
};
