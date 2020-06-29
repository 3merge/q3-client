import React from 'react';

// there had been more here that has since moved into hooks
// now this just prevents wasted re-renders
export default (Component) =>
  React.memo(
    (props) => <Component {...props} />,
    (a, b) => !(a.value !== b.value || a.error !== b.error),
  );
