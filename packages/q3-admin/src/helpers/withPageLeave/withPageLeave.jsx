import React from 'react';
import { invoke } from 'lodash';

const withPageLeave = (Component) => (props) => {
  const ref = React.useRef();
  React.useLayoutEffect(
    () => () => invoke(ref, 'current'),
    [],
  );

  return <Component {...props} ref={ref} />;
};

export default withPageLeave;
