import React from 'react';
import { invokeFnWithCallback } from './utils';

export default ({ onEnter, onExit, onInit }, state) => {
  const [hasEntered, setHasEntered] = React.useState(
    !onEnter && !onInit,
  );

  React.useEffect(() => {
    if (state.fetching && onInit) onInit();
    if (!state.fetching && !hasEntered)
      invokeFnWithCallback(onEnter, state, () =>
        setHasEntered(true),
      );

    return () => {
      if (
        !state.fetching &&
        hasEntered &&
        onExit &&
        onEnter
      ) {
        onExit(state);
        setHasEntered(false);
      }
    };
  }, [hasEntered, state.fetching, state.url]);

  return hasEntered;
};
