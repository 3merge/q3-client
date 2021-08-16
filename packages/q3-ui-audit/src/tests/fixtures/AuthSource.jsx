/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

const StoriesApiMockAuthentication = ({
  children,
  revokeAccessToAudit,
  revokeAccessToUsers,
}) => {
  const permissions = [];

  if (!revokeAccessToAudit)
    permissions.push({
      coll: 'audit',
      fields: ['*'],
      op: 'Read',
    });

  if (!revokeAccessToUsers)
    permissions.push({
      coll: 'q3-api-users',
      fields: ['*'],
      op: 'Read',
    });

  return (
    <AuthContext.Provider
      value={{
        state: {
          init: true,
          permissions,
          profile: {
            role: 'Tester',
          },
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

StoriesApiMockAuthentication.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StoriesApiMockAuthentication;
