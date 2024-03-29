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
  const [start, end] = String(char).split('');
  return `${start}${v}${end}`;
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
  else if (v.startsWith('id'))
    out = v.substring(3, v.length - 1);
  return out.replace(/%20/g, ' ');
};

export const isNumeric = (str) => {
  if (typeof str === 'number') return true;
  if (typeof str !== 'string') return false;
  return (
    !Number.isNaN(str) && !Number.isNaN(parseFloat(str))
  );
};

export const isMongoId = (str) => {
  const id = String(str);
  const d = new Date(parseInt(id.substr(0, 8), 16) * 1000);

  return (
    /^[a-f\d]{24}$/i.test(id) &&
    d instanceof Date &&
    !Number.isNaN(d)
  );
};
