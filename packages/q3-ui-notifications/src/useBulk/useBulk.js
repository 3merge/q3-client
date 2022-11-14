import React from 'react';
import { includes, filter, size } from 'lodash';

const useBulk = () => {
  const [state, setState] = React.useState([]);

  return {
    count: size(state),
    state,

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
