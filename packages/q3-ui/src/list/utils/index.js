export const hasLength = (a) =>
  Array.isArray(a) && a.length;

export const formatArrayAsCommaDelineatedString = (v) => {
  const isArray = Array.isArray(v);
  const isString = typeof v === 'string';
  const fb = '--';

  if (
    (!isString && !isArray) ||
    (isString && !v.length) ||
    (isArray && !v.length)
  )
    return fb;

  if (isArray) return v.map((i) => i.trim()).join(', ');
  return v;
};
