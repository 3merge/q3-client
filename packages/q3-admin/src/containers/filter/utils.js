import React from 'react';
import { get } from 'lodash';
import { navigate } from '@reach/router';
import { asOptions } from 'q3-ui-forms/lib/helpers';
import { isArray } from '../../components/utils';

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
    if (requiresOptions(child.props.type)) v = toArray(v);

    return React.cloneElement(child, {
      options: asOptions(v),
    });
  });

export const appendEmptyValues = (a, next) =>
  isArray(a).reduce((acc, item) => {
    let v = next(item.props.name);
    if (requiresOptions(item.props.type)) v = toArray(v);
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
