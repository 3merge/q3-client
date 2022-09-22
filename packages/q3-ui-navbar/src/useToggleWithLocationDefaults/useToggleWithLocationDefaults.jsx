import { useMatch } from '@reach/router';
import { isObject } from 'lodash';
import useToggleEffect from '../useToggleEffect';

const useToggleWithLocationDefaults = (path) => {
  const matches = isObject(useMatch(path));

  return {
    ...useToggleEffect(matches),
    matches,
  };
};

export default useToggleWithLocationDefaults;
