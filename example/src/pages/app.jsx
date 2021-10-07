import React from 'react';
import { AdminRouter } from 'gatsby-theme-q3/src/components';
import { Dashboard, Companies } from '../components';

export default () => (
  <AdminRouter
    AdminProps={{
      AppProps: {
        customRoutes: [<Dashboard path="/" />],
        pages: [Companies].flat(),
      },
    }}
  />
);
