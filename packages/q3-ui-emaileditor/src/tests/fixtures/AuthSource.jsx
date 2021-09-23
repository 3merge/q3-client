/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

const StoriesApiMockAuthentication = ({
  children,
  revokeAccessToEmails,
}) => {
  const permissions = [];

  if (!revokeAccessToEmails)
    permissions.push({
      coll: 'emails',
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
