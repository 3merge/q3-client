import React from 'react';
import * as yup from 'yup';
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
  return [key, arrayIndex, path];
};

export const deassignValidationKey = (k) => (prevState) => {
  if (!k) return prevState;

  const copy = { ...prevState };
  const [key, arrayIndex, path] = getPath(k);

  if (Array.isArray(copy[key])) {
    if (copy[key][arrayIndex] && path) {
      delete copy[key][arrayIndex][path];
    }

    copy[key] = copy[key].filter(
      (item) => item && object.hasKeys(item),
    );
  } else {
    delete copy[key];
  }

  return copy;
};

export const assignNewValidationKey = (k, args) => (
  prevState,
) => {
  if (!k) return prevState;

  const copy = { ...prevState };
  const validation = new Validator(args).build();
  const [key, arrayIndex, path] = getPath(k);

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

  const removeField = React.useCallback(
    (...params) =>
      setChain(deassignValidationKey(...params)),
    [chain],
  );

  return {
    validationSchema,
    setField,
    removeField,
    chain,
  };
};
