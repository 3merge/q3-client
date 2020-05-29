import { useTranslation } from 'react-i18next';
import { get, isNull, isPlainObject } from 'lodash';
import flat from 'flat';
import save from 'file-saver';
import { renameKeys } from './helpers';
import saveAsExcel from './useXls';

const DELIMETER_CHAR = ',';

const getAllPossibleKeys = (a) =>
  Object.keys(
    a.reduce(
      (res, item) => ({
        ...res,
        ...flat(item),
      }),
      {},
    ),
  );

const fillKeys = (keys, target) =>
  keys.reduce(
    (result, key) =>
      Object.assign(result, {
        [key]: get(target, key, ''),
      }),
    {},
  );

const delimite = (v) =>
  Array.isArray(v) ? v.join(DELIMETER_CHAR) : v;

const canBeStringified = (v) =>
  isPlainObject(v) && !isNull(v);

const castToString = (v) =>
  String(
    canBeStringified(v) ? JSON.stringify(v) : delimite(v),
  )
    .replace(/%20/gi, ' ')
    .replace(/,/gi, ';');

export const toTable = (items = [], t) => {
  const keys = getAllPossibleKeys(items);

  return items.reduce((acc, row, i) => {
    const formatted = renameKeys(fillKeys(keys, row), t);

    if (i === 0)
      acc.push(
        Object.keys(formatted).map((v) =>
          v.replace(/\.\d+\./gi, '.$.'),
        ),
      );
    acc.push(Object.values(formatted).map(castToString));
    return acc;
  }, []);
};

export const toCsv = (a, t) => toTable(a, t).join('\n');

export default (items, name = 'export') => {
  const { t } = useTranslation('labels');

  return {
    downloadAsCsv: () => {
      save(new Blob([toCsv(items, t)]), `${name}.csv`);
    },

    downloadAsExcel: () => {
      saveAsExcel(toTable(items, t));
    },
  };
};
