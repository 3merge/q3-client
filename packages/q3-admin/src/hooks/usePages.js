import React from 'react';
import { useTranslation } from 'q3-ui-locale';
import { AuthContext, useAuth } from 'q3-ui-permissions';
import {
  get,
  compact,
  map,
  flatten,
  groupBy,
  merge,
} from 'lodash';
import { makePath } from '../components/app';

const assignSegments = (xs) =>
  compact(
    flatten(
      map(xs, (page) => {
        if (!page?.index) return null;
        return page;
      }),
    ),
  );

export default (pages = []) => {
  const { t } = useTranslation();
  const { state } = React.useContext(AuthContext);

  const makePage = (page) => ({
    ...page,
    segments: merge(
      {},
      page.segments,
      get(state, `filters.${page.collectionName}`),
    ),
    to: makePath(page),
    visible: page.collectionName
      ? useAuth(page.collectionName).inClient
      : true,
    label: t(`labels:${page.resourceName}`),
  });

  return groupBy(
    map(assignSegments(pages), makePage),
    (v) => v.parent,
  );
};
