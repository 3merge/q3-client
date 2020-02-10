import React from 'react';
import { get } from 'lodash';
import { asOptions } from 'q3-ui-forms/lib/helpers';
import { isArray } from '../../components/utils';

export const toArray = (v) => {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string' && v.length)
    return v.split(',').map((i) => i.trim());

  return [];
};

export const mapByName = (children) =>
  isArray(children).map((item) => item.props.name);

export const requiresArray = (v) =>
  ['chips', 'checkboxGroup', 'select'].includes(v);

export const requiresOptions = (v, arr) =>
  ['select', 'checkboxGroup'].includes(v)
    ? asOptions(arr)
    : arr;

export const appendOptions = (a, fields) =>
  isArray(a).map((child) => {
    let v = get(
      fields,
      child.props.name.replace('%2E', '.'),
      [],
    );
    if (requiresArray(child.props.type)) v = toArray(v);

    return React.cloneElement(child, {
      options: requiresOptions(child.props.type, v),
    });
  });
