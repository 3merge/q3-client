import { useAuth } from 'q3-ui-permissions';
import { isFunction } from 'lodash';

// look at Profile and Domain components
// this will make sense based on how we generate links
const useAuthLinks = (
  collectionName,
  authProp,
  output = [],
  authPropParam = undefined,
) => {
  const auth = useAuth(collectionName);
  const condition =
    authPropParam && isFunction(auth[authProp])
      ? auth[authProp](authPropParam)
      : auth[authProp];

  return condition ? output : [];
};

export default useAuthLinks;
