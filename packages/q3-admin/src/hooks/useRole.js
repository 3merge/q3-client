import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import { some } from 'lodash';

const useRole = () => {
  const role =
    React.useContext(AuthContext)?.state?.profile?.role;

  return {
    is(expectedRole) {
      return role === expectedRole;
    },

    isOneOf(expectedRoles = []) {
      return some(expectedRoles, this.is);
    },

    includes(expectedRolePart) {
      return String(role).includes(expectedRolePart);
    },

    role,
  };
};

export default useRole;
