import { useMatch } from '@reach/router';
import { isObject } from 'lodash';
import useToggleEffect from '../useToggleEffect';

export const usePartialMatch = (path) =>
  useMatch(
    // ends up being the same
    path !== '/' ? [path, '*'].join('/') : '/',
  );

const useToggleWithLocationDefaults = (path) => {
  const completeMatch = useMatch(path);
  const partialMatch = usePartialMatch(path);

  const matches =
    isObject(completeMatch) || isObject(partialMatch);

  return {
    ...useToggleEffect(matches),
    matches,
  };
};

export default useToggleWithLocationDefaults;
