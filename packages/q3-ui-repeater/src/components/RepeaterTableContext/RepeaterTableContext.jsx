import React from 'react';
import { map, isEqual } from 'lodash';

export const stringifyIds = (xs) =>
  map(xs?.data, (item) => item?.id).join(',');

export const hasDataPropChangedShape = (prev, curr) =>
  !isEqual(prev?.data, curr?.data) ||
  !stringifyIds(prev) === stringifyIds(curr);

export default React.createContext(
  {
    data: [],
  },
  (prev, curr) =>
    hasDataPropChangedShape(prev, curr) ? 1 : 0,
);
