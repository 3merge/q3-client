import React from 'react';
import { AuthContext } from 'q3-ui-permissions';

const useRole = () => {
  const role =
    React.useContext(AuthContext)?.state?.profile?.role;

  return {
    is(expectedRole) {
      return role === expectedRole;
    },
  };
};

export default useRole;
