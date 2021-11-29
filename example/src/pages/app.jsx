import React from 'react';
import { AdminRouter } from 'gatsby-theme-q3/src/components';
import { Dashboard, Companies } from '../components';

const App = () => (
  <AdminRouter
    AdminProps={{
      AppProps: {
        pages: [Companies],
        paths: [<Dashboard path="foo" />],
      },
    }}
  />
);

export default App;
