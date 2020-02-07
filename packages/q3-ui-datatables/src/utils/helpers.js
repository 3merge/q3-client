import React from 'react';
import { uniq } from 'lodash';

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
    const headers = a.reduce((curr, next) => {
      const {
        props: {
          columns: { name, description, photo, ...etc },
        },
      } = next;

      Object.entries(etc).forEach((item) => {
        if (!curr.includes(item)) curr.push(item);
      });

      return curr;
    }, []);

    const out = headers
      .filter(([k]) => {
        return a.some(({ props: { columns } }) => {
          const v = columns[k];
          return v !== undefined && v !== null && v !== '';
        });
      })
      .map(([key]) => key);

    out.unshift('name');
    return uniq(out);
  } catch (e) {
    return [];
  }
};

export const invoke = (o) =>
  typeof o === 'function' ? o({}) : o;
