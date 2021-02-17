// eslint-disable-next-line
import { act } from 'react-dom/test-utils';

export const perform = (e) => {
  return async (fn) => {
    const exec = async (a) => {
      await act(a);
      e.update();
    };

    return Array.isArray(fn)
      ? fn.reduce(async (acc, curr) => {
          await acc;
          return exec(curr);
        }, Promise.resolve())
      : exec(fn);
  };
};
