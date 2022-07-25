import React from 'react';
import { useAuth } from 'q3-ui-permissions';
import { get, invoke } from 'lodash';

const useUploadsAuth = (collectionName, options = {}) => {
  const auth = useAuth(collectionName);
  const sub = get(options, 'field', 'uploads');

  return React.useMemo(
    () =>
      [
        'canCreate',
        'canDelete',
        'canEdit',
        'canSee',
      ].reduce((acc, curr) => {
        acc[curr] =
          invoke(auth, `${curr}Sub`, sub) === true &&
          get(options, curr) !== false;

        return acc;
      }, {}),
    [collectionName],
  );
};

export default useUploadsAuth;
