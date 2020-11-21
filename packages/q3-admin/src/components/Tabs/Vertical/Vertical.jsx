import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import withRouterLinks from '../withRouterLinks';

export default withRouterLinks(({ children, ...props }) => (
  <Tabs
    {...props}
    orientation="vertical"
    variant="fullWidth"
  >
    {children}
  </Tabs>
));
