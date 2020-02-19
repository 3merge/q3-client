import React from 'react';
import { get } from 'lodash';
import Comparision from 'comparisons';
import Tile from 'q3-ui/lib/tile';
import PersistWatcher from 'q3-ui-forms/lib/builders/persistWatcher';
import { isArray, getPath } from '../../components/utils';

export const filterByComparison = (children, state) =>
  isArray(children)
    .flat()
    .filter((r) =>
      r && state && r.props.conditional
        ? new Comparision(r.props.conditional).eval(state)
        : Boolean(r),
    );

export const mapToTile = (a = [], props) =>
  a.map((element, i) => {
    const str = String(element.props.name).toLowerCase();
    const children = React.cloneElement(element, props);

    const tabbed = React.createElement(
      Tile,
      {
        title: str,
        subtitle: str,
      },
      children,
    );

    return {
      label: str,
      to: getPath(i, element.props.name.toLowerCase()),
      component: () => tabbed,
    };
  });

export const mapToPersistence = (c) =>
  isArray(c)
    .flat()
    .map((el) =>
      React.createElement(PersistWatcher, {
        id: get(el, 'props.id'),
      }),
    );

export const getCreatedBy = (data) =>
  get(data, 'createdBy.id', null);
