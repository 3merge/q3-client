/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from 'q3-ui-permissions';

const StoriesApiMockAuthentication = ({
  children,
  revokeAccessToQueues,
  revokeAccessToQueuesEditing,
}) => {
  const permissions = [];

  if (!revokeAccessToQueues) {
    permissions.push({
      coll: 'queues',
      fields: ['*'],
      op: 'Read',
    });

    if (!revokeAccessToQueuesEditing) {
      permissions.push({
        coll: 'queues',
        fields: ['*'],
        op: 'Update',
      });

      permissions.push({
        coll: 'queues',
        fields: ['*'],
        op: 'Delete',
      });
    }
  }

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
