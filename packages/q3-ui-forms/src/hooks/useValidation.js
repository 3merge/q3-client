import React from 'react';
import * as yup from 'yup';
import { set, unset } from 'lodash';
import { object, string } from 'q3-ui-helpers';
import { Validator } from '../helpers/validation';

export const splitNestedArrayNamesIntoParts = (v) =>
  string.is(v) ? v.split(/(\.\d\.)/) : [];

export const convertIntoIndexNumber = (value) => {
  const out = value
    ? Number(value.replace(/(\.|\.)/gi, ''))
    : null;

  return Number.isNaN(out) ? null : out;
};

const getPath = (value) => {
  const [key, index, path] = splitNestedArrayNamesIntoParts(
    value,
  );

  const arrayIndex = convertIntoIndexNumber(index);
  return [key, arrayIndex, path]
    .filter(
      (v) => v !== undefined && v !== null && v !== '',
    )
    .join('.')
    .replace(/\.$/, '');
};

export const deassignValidationKey = (k) => (prevState) => {
  if (!k) return prevState;

  const copy = { ...prevState };
  const path = getPath(k);
  unset(copy, path);
  return copy;
};

export const assignNewValidationKey = (k, args) => (
  prevState,
) => {
  if (!k) return prevState;

  const copy = { ...prevState };
  const validation = new Validator(args).build();
  const path = getPath(k);

  if (args && args.type && args.type.includes('range'))
    return copy;

  set(copy, path, validation);
  return copy;
};

export const mapNestedArraysToShape = (schema) => {
  return Object.entries(schema).reduce(
    (acc, [key, value]) => {
      if (Array.isArray(value))
        acc[key] = yup
          .array()
          .of(yup.object().shape(value[0]));
      else if (
        typeof value === 'object' &&
        !('_type' in value) &&
        !('_resolve' in value)
      )
        acc[key] = yup.object(value);
      else Object.assign(acc, { [key]: value });

      return acc;
    },
    {},
  );
};

export default () => {
  const [chain, setChain] = React.useState({});
  const [registered, setRegistered] = React.useState([]);

  const validationSchema = yup
    .object()
    .shape(mapNestedArraysToShape(chain));

  const setField = React.useCallback(
    (...params) => {
      setRegistered((item = []) =>
        Array.isArray(item)
          ? item.concat(params[0])
          : params[0],
      );
      setChain(assignNewValidationKey(...params));
    },
    [chain],
  );

  const removeField = React.useCallback(
    (...params) => {
      setRegistered((v) =>
        v.filter((item) => item !== params[0]),
      );
      setChain(deassignValidationKey(...params));
    },
    [chain],
  );

  // single we change the path name to match with Yup
  // we need to keep a registry of original field names so we can tell when something's
  // been initialized
  const hasRegistered = (name) => registered.includes(name);

  return {
    validationSchema,
    setField,
    removeField,
    chain,
    hasRegistered,
  };
};
