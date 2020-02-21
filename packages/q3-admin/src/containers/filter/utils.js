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

const modifyChildWithOptions = (fields) => {
  const exec = (child) => {
    const recurse = (c) => {
      if (!c || !c.props) return c;

      let v = get(
        fields,
        get(c, 'props.name', '').replace('%2E', '.'),
        [],
      );

      if (requiresArray(c.props.type)) v = toArray(v);

      return React.cloneElement(
        c,
        {
          options: requiresOptions(c.props.type, v),
          ...c.props,
        },
        Array.isArray(c.props.children)
          ? c.props.children.map(exec)
          : exec(c.props.children),
      );
    };

    return recurse(child);
  };

  return exec;
};

export const appendOptions = (a, fields) =>
  isArray(a).map((child) => {
    const fn = modifyChildWithOptions(fields);
    return fn(child);
  });
