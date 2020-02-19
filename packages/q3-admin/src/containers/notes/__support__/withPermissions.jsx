import React from 'react';
import { AuthContext } from 'q3-ui-permissions';

export default (Component, permissions) => () => (
  <AuthContext.Provider
    value={{
      state: {
        permissions,
      },
    }}
  >
    <Component />
  </AuthContext.Provider>
);
