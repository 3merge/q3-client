import { useLocation } from '@reach/router';
import { isString, uniq } from 'lodash';
import useSortPreference from './useSortPreference';

export const replaceSearchStringSort = (
  search,
  newValue,
) => {
  const str = String(search);

  if (str.includes('sort'))
    return uniq(
      search
        .replace(/sort=([^&]*)/g, `sort=${newValue}`)
        .split('&'),
    ).join('&');

  return str === 'undefined'
    ? str
    : `${str}&sort=${newValue}`.replace(
        /^(\?\?|\?&|&)/,
        '?',
      );
};

export default (...params) => {
  const location = useLocation();
  const { sort: sortPreference } = useSortPreference(
    ...params,
  );

  let search = location?.search || '';

  if (isString(search) && isString(sortPreference))
    search = replaceSearchStringSort(
      search,
      sortPreference,
    );

  return {
    ...location,
    search,
  };
};
