import { useLocation } from '@reach/router';
import { isString } from 'lodash';
import { url } from 'q3-ui-helpers';
import useSortPreference from './useSortPreference';

export default (...params) => {
  const location = useLocation();
  const { sort: sortPreference } = useSortPreference(
    ...params,
  );

  let search = location?.search || '';

  if (isString(search) && isString(sortPreference))
    search = url.replaceParamValueInSearchString(
      search,
      'sort',
      sortPreference,
    );

  return {
    ...location,
    search,
  };
};
