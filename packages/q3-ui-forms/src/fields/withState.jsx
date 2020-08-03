import React from 'react';
import { omit } from 'lodash';

// we only really care about changes to local state here
const stringifyStateProps = (v) =>
  JSON.stringify(
    omit(v, [
      'values',
      'errors',
      'onChange',
      'onArrayPull',
      'onArrayPush',
    ]),
  );

// there had been more here that has since moved into hooks
// now this just prevents wasted re-renders
export default (Component) =>
  React.memo(Component, (a, b) => {
    return (
      stringifyStateProps(a) === stringifyStateProps(b) &&
      // ensure for more complex field values
      a.value === b.value
    );
  });
