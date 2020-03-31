import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

export const COLLECTION_NAME = 'investors';

const genPermission = (rest) => ({
  coll: COLLECTION_NAME,
  ownership: 'Any',
  fields: '*',
  ...rest,
});

const permissions = [
  genPermission({ op: 'Read' }),
  genPermission({ op: 'Update' }),
  genPermission({ op: 'Create' }),
  genPermission({ op: 'Delete' }),
];

const profile = {
  id: 1,
  photo: 'https://randomuser.me/api/portraits/men/22.jpg',
  firstName: 'Mike',
};

const StoriesApiMockAuthentication = ({ children }) => (
  <AuthContext.Provider
    value={{
      state: {
        init: true,
        profile,
        permissions,
      },
    }}
  >
    {children}
  </AuthContext.Provider>
);

StoriesApiMockAuthentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoriesApiMockAuthentication;
