import React from 'react';
import { get } from 'lodash';
import { asOptions } from 'q3-ui-forms/lib/helpers';
import { array, props, url } from 'q3-ui-helpers';
import { isArray } from '../../components/utils';

export const requiresArray = (v) =>
  ['chips', 'checkboxGroup', 'select'].includes(v);

export const requiresOptions = (v, arr) =>
  ['select', 'checkboxGroup'].includes(v)
    ? asOptions(arr)
    : arr;

const modifyChildWithOptions = (fields) => {
  const getValue = ({ name, type }) => {
    let v = get(fields, url.decode(name), []);
    if (requiresArray(type)) v = array.castString(v);
    return v;
  };

  const exec = (child) => {
    const recurse = (c) =>
      props.has(c)
        ? React.cloneElement(
            c,
            {
              options: requiresOptions(
                get(c, 'props.type', 'text'),
                getValue(c.props),
              ),
            },
            props.callOnChildren(c, recurse),
          )
        : c;

    return recurse(child);
  };

  return exec;
};

export const appendOptions = (a, fields) =>
  isArray(a).map((child) => {
    const fn = modifyChildWithOptions(fields);
    return fn(child);
  });
