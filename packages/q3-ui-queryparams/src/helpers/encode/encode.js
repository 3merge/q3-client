import flat from 'flat';
import { timezone } from 'q3-ui-locale';
import { size } from 'lodash';
import {
  getValue,
  quoteComma,
  wrap,
  prepend,
} from '../utils';

const getParamName = (v) => {
  const [name] = encodeURIComponent(v)
    .replace(/~/g, '.')
    .split('*');
  return name;
};

const join = (key, value) => {
  if (value.startsWith('=') || value.startsWith('!'))
    return `${key}${value}`;

  return `${key}=${value}`;
};

const getValueArray = (a) => {
  const escape = a.map(getValue).map(quoteComma);
  const { length } = escape;

  return length
    ? prepend(
        wrap(escape.join(','), '()'),
        length > 1 ? 'in' : 'string',
      )
    : '';
};

export const extractValue = (val) =>
  encodeURIComponent(
    Array.isArray(val) ? getValueArray(val) : getValue(val),
  );

export default (o) =>
  Object.entries(flat.unflatten(o))
    .reduce((acc, [key, value]) => {
      if (value === null) return acc;

      const normalized = extractValue(value);
      const hasAsterisk = key.includes('*');
      const name = getParamName(key);

      if (timezone.isYmd(value)) {
        acc.push(join(name, timezone.toUtc(value)));
      } else if (hasAsterisk && normalized === 'true') {
        acc.push(name);
      } else if (
        !hasAsterisk &&
        normalized !== 'undefined' &&
        normalized.length
      ) {
        acc.push(join(name, normalized));
      }

      return acc;
    }, [])
    .join('&');
