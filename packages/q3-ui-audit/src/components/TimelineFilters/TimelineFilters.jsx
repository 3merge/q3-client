import React from 'react';
import { isObject, uniq } from 'lodash';
import { object } from 'q3-ui-helpers';
import flat from 'flat';
import { Builders } from 'q3-ui-forms';

const TimelineFilters = ({ data }) => {
  const getKeys = (xs) => {
    const target = isObject(xs) ? flat(xs) : {};
    return object.hasKeys(target)
      ? Object.keys(target)
      : [];
  };

  const keys = Array.isArray(data)
    ? data.reduce(
        (acc, curr) =>
          curr
            ? acc.concat([
                ...getKeys(curr.added),
                ...getKeys(curr.updated),
                ...getKeys(curr.deleted),
              ])
            : acc,
        [],
      )
    : [];

  return null;
  // return uniq(keys);
};

export default TimelineFilters;
