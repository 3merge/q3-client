import React from 'react';
import * as yup from 'yup';
import { Validator } from '../helpers/validation';

export const convertIntoIndexNumber = (value) => {
  const out = value
    ? Number(value.replace(/(\.|\.)/gi, ''))
    : null;

  return Number.isNaN(out) ? null : out;
};

export const assignNewValidationKey = (k, args) => (
  prevState,
) => {
  if (!k) return prevState;

  const copy = { ...prevState };
  const validation = new Validator(args).build();

  const [key, index, path] = k.split(/(\.\d\.)/);
  const arrayIndex = convertIntoIndexNumber(index);

  if (path) {
    if (Array.isArray(copy[key])) {
      if (!copy[key][arrayIndex])
        copy[key][arrayIndex] = {};

      copy[key][arrayIndex][path] = validation;
      return copy;
    }

    if (arrayIndex || arrayIndex === 0) {
      copy[key] = [
        {
          [path]: validation,
        },
      ];

      return copy;
    }
  }

  return {
    ...copy,
    [key]: validation,
  };
};

export const mapNestedArraysToShape = (schema) =>
  Object.entries(schema).reduce((acc, [key, value]) => {
    acc[key] = Array.isArray(value)
      ? yup.array().of(yup.object().shape(value[0]))
      : value;
    return acc;
  }, {});

export default () => {
  const [chain, setChain] = React.useState({});
  const validationSchema = yup
    .object()
    .shape(mapNestedArraysToShape(chain));

  const setField = React.useCallback(
    (...params) =>
      setChain(assignNewValidationKey(...params)),
    [chain],
  );

  return {
    validationSchema,
    setField,
    chain,
  };
};
