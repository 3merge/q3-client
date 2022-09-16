import { useMatch } from '@reach/router';
import { useToggle } from 'useful-state';
import { isObject } from 'lodash';

const useToggleWithLocationDefaults = (path) =>
  useToggle(isObject(useMatch(path)));

export default useToggleWithLocationDefaults;
