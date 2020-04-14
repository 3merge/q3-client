import React from 'react';
import { browser } from 'q3-ui-helpers';

const { isDefined, proxyLocalStorageApi } = browser;

export default (Component) => (props) => {
  const {
    id,
    defaultSortPreference = '-updatedAt',
    collectionName,
    location,
    navigate,
  } = props;

  const q = new URLSearchParams(location.search);
  const sort = q.get('sort');

  React.useEffect(() => {
    if (sort || id) return;
    const prevState = proxyLocalStorageApi(
      'getItem',
      collectionName,
    );

    const newState = isDefined(prevState)
      ? prevState
      : defaultSortPreference;

    q.set('sort', newState);
    navigate(`?${q.toString()}`);
  }, [sort, id]);

  return sort || id ? <Component {...props} /> : null;
};
