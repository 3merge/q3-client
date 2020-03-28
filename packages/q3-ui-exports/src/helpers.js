import { get } from 'lodash';
import flat from 'flat';
import { ExcelWorkspaceHeaderCellStyles } from './useStyle';

export const renameKeys = (o = {}, mutator) =>
  Object.entries(flat(o)).reduce(
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

export const getColumns = (data, fn) =>
  Object.values(renameValues(data, fn)).map((title) => ({
    ...ExcelWorkspaceHeaderCellStyles,
    title,
  }));

export const getData = (data, fn) =>
  data.map((row) =>
    Object.keys(renameValues(data, fn)).map((field) => ({
      value: get(row, field),
    })),
  );
