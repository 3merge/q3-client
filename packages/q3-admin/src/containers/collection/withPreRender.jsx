import React from 'react';
import { object } from 'q3-ui-helpers';

export default (Component) => (props) => {
  // eslint-disable-next-line
  const { onMount } = props;
  const hasFn = object.isFn(onMount);
  const [hasFinished, setHasFinished] = React.useState(
    !hasFn,
  );

  React.useEffect(() => {
    if (!hasFinished) {
      onMount();
      setHasFinished(true);
    }
  }, [hasFinished, onMount]);

  return hasFinished ? <Component {...props} /> : null;
};
