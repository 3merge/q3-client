import React from 'react';
import { AuthContext } from 'q3-ui-permissions';

export default ({ children }) => (
  <AuthContext.Provider
    value={{
      state: {
        permissions: [
          {
            'coll': 'test',
            'op': 'Read',
            'fields': ['streetNumber', 'postal'],
          },
          {
            'coll': 'test',
            'op': 'Update',
            'fields': [
              'streetNumber',
              {
                glob: 'postal',
                test: ['streetNumber>10'],
              },
            ],
          },
        ],
        profile: {},
      },
    }}
  >
    {children}
  </AuthContext.Provider>
);
