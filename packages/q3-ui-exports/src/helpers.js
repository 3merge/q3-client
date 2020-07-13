import { get } from 'lodash';
import flat from 'flat';

export const renameKeys = (o = {}, mutator) =>
  Object.entries(o).reduce(
    (acc, [key, value]) =>
      Object.assign(acc, {
        [mutator(key)]: value,
      }),
    {},
  );

const renameValues = (a = [], mutator) =>
  a.reduce((acc, o) => {
    Object.keys(flat(o)).forEach((item) => {
      Object.assign(acc, {
        [item]: mutator(item),
      });
    });

    return acc;
  }, []);

export const getData = (data, fn) =>
  data.map((row) =>
    Object.keys(renameValues(data, fn)).map((field) => ({
      value: get(row, field),
    })),
  );
