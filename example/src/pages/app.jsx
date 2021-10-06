import React from 'react';
import { AdminRouter } from 'gatsby-theme-q3/src/components';
import { useTimezoneInterceptor } from 'q3-ui-rest';
import pages from '../views';

export default () => {
  useTimezoneInterceptor('America/Los_Angeles');

  return (
    <AdminRouter
      AdminProps={{
        AppProps: {
          pages,
        },
      }}
    />
  );
};
