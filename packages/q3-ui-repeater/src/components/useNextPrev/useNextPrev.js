import React from 'react';
import { size } from 'lodash';
import RepeaterTableContext from '../RepeaterTableContext';

export const findIndexById = (a, id) =>
  Array.isArray(a) && id
    ? a.findIndex((item) => String(item.id) === String(id))
    : -1;

export const findByIndex = (a, index) => {
  try {
    const out = a[index];
    if (!out)
      throw new Error('ID does not exists in this array');

    return out;
  } catch (e) {
    return null;
  }
};

const useNextPrev = (id) => {
  const { data: state } = React.useContext(
    RepeaterTableContext,
  );

  const count = size(state);
  const index = findIndexById(state, id);
  const data = findByIndex(index);

  const getIdOf = (v) => findByIndex(state, v)?.id;

  return {
    data,

    next() {
      const newIndex = index + 1;
      return getIdOf(newIndex > count - 1 ? 0 : newIndex);
    },

    prev() {
      const newIndex = index - 1;
      return getIdOf(newIndex < 0 ? count - 1 : newIndex);
    },
  };
};

export default useNextPrev;
