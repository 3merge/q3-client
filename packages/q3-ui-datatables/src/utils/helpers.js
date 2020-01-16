import React from 'react';

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
    const [
      {
        props: {
          columns: { name, description, photo, ...headers },
        },
      },
    ] = React.Children.toArray(c);

    const out = Object.keys(headers);
    out.unshift('name');
    return out;
  } catch (e) {
    return [];
  }
};
