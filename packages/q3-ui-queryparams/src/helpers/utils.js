import { timezone } from 'q3-ui-locale';
import { isObject } from 'lodash';

export const getValue = (o) =>
  String(isObject(o) ? o.value : o);

export const prepend = (str, char) =>
  !String(str).startsWith(char)
    ? String(char).concat(str)
    : str;

export const quoteSpecialChar = (str, char = ',') =>
  String(str).includes(char) ? `"${str}"` : str;

export const quoteComma = (item) =>
  quoteSpecialChar(item, ',');

export const wrap = (v, char) => {
  let out = String(v);
  const [start, end] = String(char).split('');

  if (!out.startsWith(start) && start)
    out = start.concat(out);

  if (!out.endsWith(end) && end) out = out.concat(end);
  return out;
};

export const formatter = (v = '') => ({
  get key() {
    return v.replace(/(>|<)/gi, '').replace(/~/gi, '.');
  },

  get value() {
    if (timezone.isUtc(v))
      return timezone.toLocal(v, timezone.YMD);

    return String(v).replace(/^"(.*)"$/, '$1');
  },
});

export const unquote = (v) => {
  let out = String(v);
  if (out.startsWith('"'))
    out = out.substring(1, out.length - 1);
  if (out.endsWith('"'))
    out = out.substring(0, out.length - 2);

  return out;
};

export const ensureBoolean = (v) => {
  if (v === 'true') return true;
  if (v === 'false') return false;
  return v;
};

export const ensureNumber = (v) => {
  if (/^\d+$/.test(v)) return Number(v);
  if (
    !Number.isNaN(v) &&
    String(
      !Number.isNaN(v) &&
        Number.toString().indexOf('.') !== -1,
    )
      .toString()
      .indexOf('.') !== -1
  )
    return Number.parseFloat(v);

  return v;
};

export const clean = (v) => {
  let out = String(v);
  if (v.startsWith('in'))
    out = v.substring(3, v.length - 1);
  else if (v.startsWith('string'))
    out = v.substring(7, v.length - 1);
  return out.replace(/%20/g, ' ');
};

export const parseOp = (key, value) => {
  const a = String(key);
  const b = String(value);
  if (a.startsWith('!') || b === 'has(false)')
    return 'hasNot';
  if (!b || b === 'has(true)') return 'has';
  if (a.endsWith('!') && b.startsWith('in'))
    return 'doesNotInclude';
  if (a.endsWith('!')) return 'doesNotEqual';
  if (b.startsWith('string')) return 'equals';
  if (b.startsWith('in')) return 'includes';
  if (a.endsWith('<')) return 'lessThan';
  if (a.endsWith('>')) return 'moreThan';
  if (b === 'exists(true)') return 'exists';
  if (b === 'exists(false)') return 'doesNotExist';
  return 'equals';
};
