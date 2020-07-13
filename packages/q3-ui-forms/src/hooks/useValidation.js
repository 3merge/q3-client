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

  if (args.type.includes('range')) return copy;

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
  const [registered, setRegistered] = React.useState([]);

  const validationSchema = yup
    .object()
    .shape(mapNestedArraysToShape(chain));

  const setField = React.useCallback(
    (...params) => {
      setRegistered((item) => item.concat(params[0]));
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
