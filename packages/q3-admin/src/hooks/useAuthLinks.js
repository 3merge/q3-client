import { useAuth } from 'q3-ui-permissions';
import { isFunction, isObject, map } from 'lodash';
import useDomainContext from './useDomainContext';

// look at Profile and Domain components
// this will make sense based on how we generate links
const useAuthLinks = (
  collectionName,
  authProp,
  output = [],
  authPropParam = undefined,
) => {
  const auth = useAuth(collectionName);
  const { directory = '/' } = useDomainContext();

  const condition =
    authPropParam && isFunction(auth[authProp])
      ? auth[authProp](authPropParam)
      : auth[authProp];

  return map(condition ? output : [], (item) => {
    if (isObject(item) && item.to) {
      return {
        ...item,
        to: String(directory + item.to).replace(
          /([^:]\/)\/+/g,
          '$1',
        ),
      };
    }

    return item;
  });
};

export default useAuthLinks;
