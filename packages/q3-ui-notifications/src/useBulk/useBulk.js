import React from 'react';
import {
  compact,
  includes,
  filter,
  size,
  map,
} from 'lodash';

const useBulk = () => {
  const [state, setState] = React.useState([]);

  return {
    count: size(state),
    state,

    all(ids = []) {
      setState(map(compact(ids), String));
    },

    isActive(id) {
      return includes(state, String(id));
    },

    toggle(id) {
      const nextId = String(id);

      return setState((prevState = []) => {
        if (includes(prevState, nextId))
          return filter(
            prevState,
            (item) => item !== nextId,
          );

        if (Array.isArray(prevState))
          return prevState.concat(nextId);

        return [nextId];
      });
    },

    reset() {
      setState([]);
    },
  };
};

export default useBulk;
