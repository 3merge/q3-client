import React from 'react';
import { get, first, last } from 'lodash';
import flat from 'flat';
import { array, object } from 'q3-ui-helpers';

const toArray = (children) =>
  React.Children.toArray(children);

export const getEmptyEntry = (prefix, index, children) =>
  toArray(children).reduce((acc, item = {}) => {
    const { children: subChildren, props } = item;
    const name = get(props, 'name');

    if (subChildren)
      return getEmptyEntry(prefix, index, subChildren);

    if (!name) return acc;
    acc[`${prefix}.${index}.${name}`] = '';

    return acc;
  }, {});

export const assignNameToFields = (
  { index, newState, prefix, ...rest },
  children,
  t,
) =>
  toArray(children).map((item, i) => {
    const { children: subChildren, props } = item || {};
    const attribute = get(props, 'name');

    if (subChildren)
      return assignNameToFields(prefix, index, subChildren);

    if (!attribute) return item;

    const label = `${prefix}.${attribute}`;
    const name = `${prefix}.${index}.${attribute}`;
    const autoFocus = i === 0 && get(newState, name) === '';

    return React.cloneElement(item, {
      ...props,
      ...rest,
      name,
      label: t ? t(label) : label,
      autoFocus,
    });
  });

export const getNumberFromRepeaterFieldName = (
  pathname,
) => {
  try {
    return Number(
      first(last(pathname.split('[')).split(']')),
    );
  } catch (e) {
    return 0;
  }
};

export const checkValueIfWithinMinimumThreshold = (
  minimumValue,
) =>
  function customYupValidationMethod(inputValue) {
    return getNumberFromRepeaterFieldName(this.path) <
      minimumValue
      ? Boolean(inputValue)
      : true;
  };

export const makeStateProxy = ({ values = {} }, group) => ({
  getAll() {
    return array
      .is(get(flat.unflatten(object.is(values)), group, []))
      .filter(object.hasKeys);
  },

  filterByIndex(newState, index) {
    return Array.isArray(newState[group])
      ? newState[group].filter((item, i) => i !== index)
      : [];
  },

  fill(minLength, genArrayItem) {
    const items = this.getAll();

    return Array.from({
      length: minLength,
    }).reduce(
      (acc, _, index) =>
        index >= items.length
          ? Object.assign(
              acc,
              genArrayItem(items.length + index),
            )
          : acc,
      {},
    );
  },
});
