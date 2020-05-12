import React from 'react';
import { get } from 'lodash';
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

  const q = new URLSearchParams(
    get(location, 'search', ''),
  );

  const sort = q.get('sort');
  /*
  const skip = sort || id || !navigate;

  React.useEffect(() => {
    if (skip) return;
    const prevState = proxyLocalStorageApi(
      'getItem',
      collectionName,
    );

    const newState = isDefined(prevState)
      ? prevState
      : defaultSortPreference;

    q.set('sort', newState);
    navigate(`?${q.toString()}`);
  }, [sort, id]); */

  return <Component {...props} />;
};
