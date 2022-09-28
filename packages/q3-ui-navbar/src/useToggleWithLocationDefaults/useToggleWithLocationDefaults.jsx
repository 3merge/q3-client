import { useMatch } from '@reach/router';
import { isObject } from 'lodash';
import useToggleEffect from '../useToggleEffect';

const useToggleWithLocationDefaults = (path) => {
  const completeMatch = useMatch(path);
  const partialMatch = useMatch(
    // ends up being the same
    path !== '/' ? [path, '*'].join('/') : '/',
  );

  const matches = isObject(completeMatch) || partialMatch;

  return {
    ...useToggleEffect(matches),
    matches,
  };
};

export default useToggleWithLocationDefaults;
