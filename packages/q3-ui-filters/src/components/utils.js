import { get } from 'lodash';

const isArray = (a) => (Array.isArray(a) ? a : [a]);

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

const findByRegex = (a, term) =>
  isArray(a).find((v) => new RegExp(term, 'gi').test(v));

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

/**
 * For wildcards, see with-location package for more information.
 * Essentially, that lib handles certain params out-of-the-box in a given format.
 */
export const queryParam = (key, operand, value) => {
  const a = serialize(value);

  switch (operand) {
    case '!*':
      return [key, value ? operand : null];
    case '*':
      return [key, value ? operand : null];
    case '[]':
      return a.length ? [key, a] : [key, null];
    case '![]':
      return a.length ? [`${key}!`, a] : [key, null];
    case '>=':
      return [`${key}>`, value];
    case '<=':
      return [`${key}<`, value];
    default:
      return [key, value];
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

      if (!newValue) remove(newKey);
      if (!key || key === 'undefined' || !newValue)
        return curr;

      return Object.assign(curr, {
        // encode dots to allow for nested queries
        // it's common to use an array index, for example, to query for length
        [newKey.replace('.', '%2E')]: newValue,
      });
    },
    {},
  );

/**
 * For initializing state with existing URL values.
 */
export const appendEmptyValues = (a, next = {}) => {
  const keys = Object.keys(next);

  return isArray(a).reduce((acc, item) => {
    const { name, type } = item.props;
    const i = findByRegex(keys, name);
    let v;

    if (i) v = next[i];
    if (requiresArray(type)) v = toArray(v);
    if (!v) v = '';

    return Object.assign(acc, {
      [item.props.name]: {
        value: v,
      },
    });
  }, {});
};
