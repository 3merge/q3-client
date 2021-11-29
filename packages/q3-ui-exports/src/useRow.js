import { useTranslation } from 'q3-ui-locale';
import { isNull, isPlainObject } from 'lodash';
import save from 'file-saver';
import { object } from 'q3-ui-helpers';
import { renameKeys } from './helpers';
import saveAsExcel from './useXls';

const DELIMETER_CHAR = ',';

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
  const keys = object.getAllPossibleKeys(items);

  return items.reduce((acc, row, i) => {
    const formatted = renameKeys(
      object.fillKeys(keys, row),
      t,
    );

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
