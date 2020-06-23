/* eslint-disable no-param-reassign */

export const unwind = (str = '', value) =>
  str
    .split(',')
    .filter((v) => v !== value)
    .join(',');

export const getOp = (op, name, value) => {
  const internalMap = {
    'exists(true)': `${name}`,
    'exists(false)': `NOT ${name}`,
    'has(true)': `HAS ${name}`,
    'has(false)': `HAS NOT ${name}`,
    '>=': `${name} IS MORE THAN ${value}`,
    '<': `${name} IS LESS THAN ${value}`,
    '!=': `${name} IS NOT ${value}`,
    '=': `${name} IS ${value}`,
  };

  if (op.includes('!=') && op.includes(','))
    return `${value} NOT IN ${name}`;

  if (op.includes('=') && op.includes(','))
    return `${value} IN ${name}`;

  return Object.entries(internalMap).reduce(
    (acc, [key, v]) =>
      op.includes(key) && !acc.length ? v : acc,
    '',
  );
};

export const filterKeysByReservedSearchKeys = (
  entries = [],
) =>
  entries.filter(
    ([key]) =>
      !['sort', 'page', 'search', 'limit'].includes(key),
  );

export const decodeEntry = ([key, value]) => {
  try {
    return decodeURIComponent(
      value ? `${key}=${value}` : key,
    );
  } catch (e) {
    return `${key}=${value}`;
  }
};

export const redirectByParams = (
  params,
  navigate,
) => () => {
  const output = [];

  params.forEach((value, key) =>
    output.push(`${key}=${encodeURIComponent(value)}`),
  );

  navigate(`?${output.join('&')}`);
};
