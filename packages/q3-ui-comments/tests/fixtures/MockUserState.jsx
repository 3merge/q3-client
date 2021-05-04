import React from 'react';
import { AuthContext } from 'q3-ui-permissions';

// eslint-disable-next-line
export default ({ children }) => (
  <AuthContext.Provider
    value={{
      state: {
        init: true,
        profile: {
          'id': '6091989dfc13ae035500000e',
          'firstName': 'Christine',
          'lastName': 'Allom',
          'photo':
            'https://robohash.org/itaqueomnisexplicabo.png?size=50x50&set=set1',
        },
      },
    }}
  >
    {children}
  </AuthContext.Provider>
);
