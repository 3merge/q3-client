import React from 'react';
import { get } from 'lodash';

const toArray = (children) =>
  React.Children.toArray(children);

export const getEmptyEntry = (prefix, index, children) => {
  return toArray(children).reduce((acc, item = {}) => {
    const { children: subChildren, props } = item;
    const name = get(props, 'name');

    if (subChildren)
      return getEmptyEntry(prefix, index, subChildren);

    if (!name) return acc;
    acc[`${prefix}.${index}.${name}`] = '';
    return acc;
  }, {});
};

export const assignNameToFields = (
  prefix,
  index,
  children,
) => {
  return toArray(children).map((item = {}) => {
    const { children: subChildren, props } = item;
    const attribute = get(props, 'name');

    if (subChildren)
      return assignNameToFields(prefix, index, subChildren);

    if (!attribute) return item;

    return React.cloneElement(item, {
      ...props,
      name: `${prefix}.${index}.${attribute}`,
      label: `${prefix}.${attribute}`,
    });
  });
};
