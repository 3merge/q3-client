import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import withRouterLinks from '../withRouterLinks';

export default withRouterLinks(
  ({ children, ...props }) => (
    <Tabs {...props} variant="scrollable">
      {children}
    </Tabs>
  ),
  {
    style: {
      minWidth: 'auto',
      paddingLeft: '1.5rem',
      paddingRight: '1.5rem',
    },
  },
);
