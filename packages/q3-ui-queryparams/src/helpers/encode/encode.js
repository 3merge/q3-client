import flat from 'flat';
import { timezone } from 'q3-ui-locale';
import {
  getValue,
  quoteComma,
  wrap,
  prepend,
  isNumeric,
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

const wrapSingularValue = (xs) => {
  if (
    !xs ||
    isNumeric(xs) ||
    ['true', 'false'].includes(String(xs)) ||
    ['string', 'in', 'exists', 'has', '{', '/'].some(
      (item) => String(xs).startsWith(item),
    )
  )
    return xs;

  return prepend(wrap(getValue(xs), '()'), 'string');
};

export const extractValue = (val) =>
  encodeURIComponent(
    Array.isArray(val)
      ? getValueArray(val)
      : wrapSingularValue(val),
  );

export default (o, options = {}) =>
  Object.entries(flat.unflatten(o))
    .reduce((acc, [key, value]) => {
      if (value === null) return acc;
      const { includePageParam = false } = options;

      const blacklist = [
        'active',
        'limit',
        'search',
        'sort',
        'fields',
        'filter',
        'populate',
      ];

      if (!includePageParam) blacklist.push('page');

      const normalized = !blacklist.includes(key)
        ? extractValue(value)
        : value;

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
