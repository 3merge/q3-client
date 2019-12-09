import React from 'react';
import FormBuilder from 'q3-ui-forms/lib/builders/submit';
import Repeater from 'q3-ui-forms/lib/builders/repeater';

export const getPath = (i, key) =>
  i !== 0 ? `/${key}` : '/';

export const isObject = (o) =>
  typeof o === 'object' && Object.keys(o).length;

export const isArray = (a) => (Array.isArray(a) ? a : [a]);

export const hasProperties = (target = {}, keys = []) =>
  keys.every(
    (key) =>
      Object.entries(target).findIndex(
        ([name, value]) => name === key && Boolean(value),
      ) !== -1,
  );

export const ellipsis = (title = '') =>
  title && title.length > 35
    ? `${title.substring(0, 35)}...`
    : title;

export const curryIf = (condition, next) =>
  condition ? () => next : null;

export const getBuilderByType = (
  type,
  component,
  options,
) => {
  let el;
  if (type === 'submit') el = FormBuilder;
  if (type === 'repeater') el = Repeater;
  if (type === 'custom') el = component;

  if (!el)
    throw new Error(`${type} is an unknown form builder`);

  return () => React.createElement(el, options);
};
