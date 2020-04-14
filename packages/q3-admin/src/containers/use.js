import React from 'react';
import Comparision from 'comparisons';
import { get } from 'lodash';
import { array, object, browser } from 'q3-ui-helpers';
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

/**
 * Used to control the visibility of tabs in the Detail component.
 */
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

const isString = (v) => typeof v === 'string';

export const includesPath = (current, previous) =>
  isString(current) && isString(previous)
    ? previous &&
      previous.includes(current.replace(/\/$/, ''))
    : current;

/**
 * Used to set the referral path between table/detail views.
 * This allows us to the programatically navigate backwards and retain previous queries.
 */
export const useReferrer = (resourceName = '/') => {
  const SESSION_STORAGE_KEY = 'q3-referrer-path';
  const getPath = () => {
    let nextReferrer = resourceName;

    const prev = browser.proxySessionStorageApi(
      'getItem',
      SESSION_STORAGE_KEY,
    );

    if (
      includesPath(resourceName, prev) &&
      browser.isDefined(prev)
    ) {
      nextReferrer = prev;
    } else {
      browser.proxySessionStorageApi(
        'removeItem',
        SESSION_STORAGE_KEY,
      );
    }

    return nextReferrer;
  };

  const setPath = (value) => {
    if (typeof window !== 'undefined')
      sessionStorage.setItem(SESSION_STORAGE_KEY, value);
  };

  return {
    getPath,
    setPath,
  };
};
