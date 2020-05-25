import React from 'react';
import { get } from 'lodash';
import { browser } from 'q3-ui-helpers';
import { AuthContext } from 'q3-ui-permissions';

const { isDefined, proxyLocalStorageApi } = browser;

const useSorting = () => {};

export default (Component) => (props) => {
  const { state } = React.useContext(AuthContext);

  const {
    id,
    defaultSortPreference = '-updatedAt',
    collectionName,
    location,
    navigate,
  } = props;

  const sortPreference = get(
    state,
    `profile.sorting.${collectionName}`,
    defaultSortPreference,
  );

  const q = new URLSearchParams(
    get(location, 'search', ''),
  );

  const sort = q.get('sort');
  const skip = id || !navigate || sort === sortPreference;

  React.useEffect(() => {
    if (skip) return;

    q.set('sort', sortPreference);
    navigate(
      `?${q.toString().replace(/\+/g, '%20')}`,
      {
        state: {
          init: true,
        },
      },
      {
        replace: true,
      },
    );
  }, [sort, id]);

  return skip ? <Component {...props} /> : null;
};
