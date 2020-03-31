import React from 'react';
import Comparision from 'comparisons';
import { get } from 'lodash';
import { array, object } from 'q3-ui-helpers';
import { AuthContext } from 'q3-ui-permissions';

const { hasKeys } = object;

/**
 * Used to seed and manage the Store state provider.
 * We assume that given an ID, we are requesting a single resource (aka Object).
 */
export const useDataStore = ({
  state,
  resourceName,
  resourceNameSingular,
  id,
}) => {
  const [dataStore, setDataStore] = React.useState(
    id ? {} : [],
  );

  React.useEffect(() => {
    const nextValue = id
      ? state[resourceNameSingular]
      : state[resourceName];

    if (nextValue) setDataStore(nextValue);
  }, [state]);

  return dataStore;
};

export const useViewResolutions = (resolutions, target) => {
  const auth = React.useContext(AuthContext);

  if (!hasKeys(resolutions)) return [];

  return Object.entries(resolutions).reduce(
    (acc, [key, val = {}]) => {
      if (
        (array.hasLength(val.conditionals) &&
          !new Comparision(val.conditionals).eval(
            target,
          )) ||
        (array.hasLength(val.roles) &&
          !val.roles.includes(
            get(auth, 'state.profile.role'),
          ))
      )
        acc.push(key);

      return acc;
    },
    [],
  );
};
