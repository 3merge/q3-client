import React from 'react';

// there had been more here that has since moved into hooks
// now this just prevents wasted re-renders
export default (Component) =>
  React.memo((props) =>
    React.createElement(Component, props),
  );
