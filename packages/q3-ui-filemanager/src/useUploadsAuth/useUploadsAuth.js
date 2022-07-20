import { useAuth } from 'q3-ui-permissions';
import { get, invoke } from 'lodash';

const useUploadsAuth = (collectionName, options = {}) => {
  const auth = useAuth(collectionName);
  const sub = get(options, 'field', 'uploads');

  return [
    'canCreate',
    'canDelete',
    'canEdit',
    'canSee',
  ].reduce((acc, curr) => {
    acc[curr] =
      invoke(auth, `${curr}Sub`, sub) === true &&
      get(options, curr) !== false;

    return acc;
  }, {});
};

export default useUploadsAuth;
