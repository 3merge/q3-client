import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { object } from 'q3-ui-helpers';

export default (Component) => (props) => {
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

  return hasFinished ? (
    <Component {...props} />
  ) : (
    <CircularProgress />
  );
};
