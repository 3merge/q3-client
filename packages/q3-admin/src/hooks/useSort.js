import { useLocation } from '@reach/router';
import { isString } from 'lodash';
import useSortPreference from './useSortPreference';

export default (...params) => {
  const location = useLocation();
  const { sort: sortPreference } = useSortPreference(
    ...params,
  );

  let search = location?.search || '';

  if (isString(search) && isString(sortPreference)) {
    if (search.includes('sort')) {
      search = search.replace(
        /sort=([^&]*)/,
        sortPreference,
      );
    } else {
      search = `${search}&sort=${sortPreference}`.replace(
        /^(\?\?|\?&|&)/,
        '?',
      );
    }
  }

  return {
    ...location,
    search,
  };
};
