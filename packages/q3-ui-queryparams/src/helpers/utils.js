import { isObject } from 'lodash';

export const filterBy = (a, value) =>
  a.filter((item) => item !== value);

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
