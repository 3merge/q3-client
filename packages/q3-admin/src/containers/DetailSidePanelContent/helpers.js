import React from 'react';
import Comparisons from 'comparisons';
import { array, object } from 'q3-ui-helpers';

export const makeSidePanelContent = (
  fn,
  data,
  dispatchers,
  t,
) => {
  if (object.hasKeys(data)) {
    if (object.isFn(fn)) return fn(data, dispatchers, t);

    if (array.hasLength(fn))
      return fn.reduce((acc, cur) => {
        if (
          cur.conditions &&
          !new Comparisons(cur.conditions).eval(data)
        )
          return acc;

        const x = {
          ...cur,
          title: t(`titles:${cur.title}`),
          content: React.createElement(cur.component, {
            data,
            dispatchers,
            t,
          }),
        };
        return [...acc, x];
      }, []);
  }

  return [];
};
