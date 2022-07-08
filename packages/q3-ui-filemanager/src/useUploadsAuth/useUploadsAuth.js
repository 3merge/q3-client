import { useAuth } from 'q3-ui-permissions';
import { get, invoke } from 'lodash';

const useUploadsAuth = (collectionName, options = {}) => {
  const auth = useAuth(collectionName);

  return [
    'canCreate',
    'canDelete',
    'canEdit',
    'canSee',
  ].reduce((acc, curr) => {
    acc[curr] =
      invoke(auth, `${curr}Sub`, 'uploads') === true &&
      get(options, curr) !== false;

    return acc;
  }, {});
};

export default useUploadsAuth;
