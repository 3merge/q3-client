import React from 'react';
import { get } from 'lodash';
import Comparision from 'comparisons';

import { isArray, getPath } from '../../components/utils';

export const filterByComparison = (children, state) =>
  isArray(children)
    .flat()
    .filter((r) =>
      r && state && r.props.conditional
        ? new Comparision(r.props.conditional).eval(state)
        : Boolean(r),
    );

export const mapToNestedRoute = (a = []) =>
  React.Children.map(a, (child, i) => {
    const str = String(child.props.name).toLowerCase();

    return {
      label: str,
      to: getPath(i, str),
      component: () => child,
    };
  });

export const getCreatedBy = (data) =>
  get(data, 'createdBy.id', null);
