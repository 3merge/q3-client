import React from 'react';
import RepeaterTableContext from '../RepeaterTableContext';

const useNextPrev = (id) => {
  const { data: state } = React.useContext(
    RepeaterTableContext,
  );

  const data =
    state[
      state.findIndex(
        (item) => String(item.id) === String(id),
      ) || 0
    ];

  const count = Array.isArray(state) ? state.length : 0;
  const getRemainderOf = (v) => v % count;

  return {
    data,

    next() {
      const i = state.findIndex((p) => {
        return String(p.id) === String(id);
      });

      return state[getRemainderOf(i + 1)]?.id;
    },

    prev() {
      const i = state.findIndex((p) => {
        return String(p.id) === String(id);
      });

      return state[getRemainderOf(i - 1)]?.id;
    },
  };
};

export default useNextPrev;
