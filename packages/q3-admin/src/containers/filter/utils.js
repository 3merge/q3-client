import React from 'react';
import { get } from 'lodash';
import { navigate } from '@reach/router';
import { asOptions } from 'q3-ui-forms/lib/helpers';
import { isArray } from '../../components/utils';

const requiresArray = (v) =>
  ['checkset', 'select', 'radio', 'chips'].includes(v);

const requiresOptions = (v) =>
  ['checkset', 'select', 'radio'].includes(v);

const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.length)
    return v.split(',').map((i) => i.trim());

  return [];
};

export const appendOptions = (a, fields) =>
  isArray(a).map((child) => {
    let v = get(fields, child.props.name, []);
    if (requiresArray(child.props.type)) v = toArray(v);

    return React.cloneElement(child, {
      options: requiresOptions(child.props.type)
        ? asOptions(v)
        : v,
    });
  });

export const appendEmptyValues = (a, next) =>
  isArray(a).reduce((acc, item) => {
    let v = next(item.props.name);
    if (requiresArray(item.props.type)) v = toArray(v);
    if (!v) v = '';

    return Object.assign(acc, {
      [item.props.name]: v,
    });
  }, {});

export const clearFilters = (a, next) =>
  isArray(a).map((item) => next(item.props.name));

export const goTo = (id, params) => {
  localStorage.setItem(id, params.toString());
  navigate(`?${params.toString()}`);
};

export const pickDefined = (o = {}) =>
  Object.entries(o).reduce(
    (curr, [key, v]) =>
      v !== '' && v !== null && v !== undefined
        ? Object.assign(curr, {
            [key]: v,
          })
        : curr,
    {},
  );
