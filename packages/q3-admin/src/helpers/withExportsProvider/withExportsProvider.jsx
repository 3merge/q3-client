import React from 'react';
import Exports from 'q3-ui-exports';
import { useLocation } from '@reach/router';

const withExportsProvider = (Component) => (props) =>
  (
    // eslint-disable-next-line
    <Exports deps={[props?.ui, useLocation()?.search]}>
      <Component {...props} />
    </Exports>
  );

export default withExportsProvider;
