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
            'fields': [
              '{company,licenses,plan}',
              {
                glob: 'instructions',
                test: ['plan!=Basic'],
              },
            ],
          },
          {
            'coll': 'test',
            'op': 'Update',
            'fields': [
              '{company,plan}',
              {
                glob: 'licenses',
                test: ['plan!=Basic'],
              },
              {
                glob: 'instructions',
                test: ['plan!=Basic'],
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
