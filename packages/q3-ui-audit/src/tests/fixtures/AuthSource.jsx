import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

const StoriesApiMockAuthentication = ({ children }) => (
  <AuthContext.Provider
    value={{
      state: {
        init: true,
        profile: {
          role: 'Tester',
        },
        permissions: [
          {
            coll: 'q3-api-users',
            fields: ['*'],
            op: 'Read',
          },
        ],
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
