import React from 'react';

export const hasLength = (v) =>
  Array.isArray(v) && v.length;

export const getPage = (query) =>
  Number(query.get('page') || 0);

export const extractIds = (c) => {
  try {
    return React.Children.toArray(c).map(
      ({ props }) => props.id,
    );
  } catch (e) {
    return [];
  }
};

export const ellpisis = (sub = '', num) =>
  sub && sub.length > num
    ? `${sub.substring(0, num)}...`
    : sub;

export const hasKeys = (etc) =>
  typeof etc === 'object' && Object.keys(etc).length;

export const extractKeys = (c) => {
  try {
    const a = React.Children.toArray(c);
    const [
      {
        props: {
          columns: { name, description, photo, ...headers },
        },
      },
    ] = a;

    const out = Object.entries(headers)
      .filter(([k]) => {
        return a.some(({ props: { columns } }) => {
          const v = columns[k];
          return v !== undefined && v !== null && v !== '';
        });
      })
      .map(([key]) => key);

    out.unshift('name');
    return out;
  } catch (e) {
    return [];
  }
};

export const invoke = (o) =>
  typeof o === 'function' ? o({}) : o;
