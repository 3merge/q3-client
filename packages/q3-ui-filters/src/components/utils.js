import { get } from 'lodash';

export const isArray = (a) => (Array.isArray(a) ? a : [a]);

const serialize = (v) =>
  Array.isArray(v) ? v.join(',') : v;

const requiresArray = (v) =>
  ['checkboxGroup', 'select', 'chips'].includes(v);

const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.length)
    return v.split(',').map((i) => i.trim());

  return [];
};

/**
 * Values are nested inside of values so that we can track operands in state.
 */
export const extractTextualValue = (v, defaultValue = '') =>
  get(v, 'value', defaultValue);

export const handleOnChange = (
  setFieldValue,
  operand,
  fn,
) => (e) => {
  setFieldValue({
    value: get(e, 'target.value'),
    operand,
  });

  if (fn) fn();
};

export const handleOnChangeBoolean = (
  setFieldValue,
  operand,
  fn,
) => (e, status) => {
  setFieldValue({
    value: status,
    operand,
  });

  if (fn) fn();
};

const convertLengthQuery = (name) =>
  name &&
  (name.endsWith('.') ||
    name.endsWith('.0') ||
    name.endsWith('%2E0'))
    ? `${name.replace('.', '%2Elength')}`
    : name;

export const assembleLengthQuery = (name) =>
  name
    .replace('%2E', '.')
    .replace('length', '0')
    .replace('%21', '!');

const removeSpecialChars = (name) =>
  name
    .replace(/[^a-zA-Z0-9 %.]/g, '')
    .replace('.', '%2E')
    .replace('!', '%21')
    .replace('%2E0', '%2Elength');

const getKey = (k, operand) => {
  const n = assembleLengthQuery(k);
  if (operand === '!*') return `!${n}`;
  return n;
};

export const findByRegex = (a, term) =>
  isArray(a).findIndex((v) => {
    return term === removeSpecialChars(v);
  });

/**
 * For wildcards, see with-location package for more information.
 * Essentially, that lib handles certain params out-of-the-box in a given format.
 */
export const queryParam = (key, operand, value) => {
  const santitized = convertLengthQuery(key);
  const a = serialize(value);
  const negated = `${santitized}!`;

  switch (operand) {
    case '!*':
      return [santitized, value ? operand : null];
    case '*':
      return [santitized, value ? operand : null];
    case '[]':
      return a.length
        ? [santitized, a]
        : [santitized, null];
    case '![]':
      return a.length ? [negated, a] : [negated, null];
    case '>=':
      return [`${santitized}>`, value];
    case '<=':
      return [`${santitized}<`, value];
    case '!=':
      return [`${santitized}!`, value];
    default:
      return [santitized, value];
  }
};

/**
 * Convert Formik into URL Search Params
 */
export const marshalFormFieldsIntoUrlString = (
  v = {},
  { remove },
) =>
  Object.entries(v).reduce(
    (curr, [key, { value, operand }]) => {
      const [newKey, newValue] = queryParam(
        key,
        operand,
        value,
      );

      if (!newValue) remove(getKey(newKey, operand));

      return operand
        ? Object.assign(curr, {
            // allows us to query for length
            [assembleLengthQuery(
              newKey,
              operand,
            )]: newValue,
          })
        : curr;
    },
    {},
  );

/**
 * For initializing state with existing URL values.
 * Note that the values reference field names - not the keys.
 */
export const appendEmptyValues = (a, next = {}) => {
  const keys = Object.keys(next)
    .map(removeSpecialChars)
    .map(convertLengthQuery);

  const values = Object.values(next);

  return isArray(a).reduce((acc, item) => {
    const { name, type } = item.props;

    const i = findByRegex(keys, name);

    let v;

    if (i !== -1) v = values[i];
    if (requiresArray(type)) v = toArray(v);
    if (type === 'checkbox' && keys.includes(name))
      v = true;

    if (!v) v = '';

    return Object.assign(acc, {
      [name]: {
        value: v,
      },
    });
  }, {});
};
