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

export default (pages = []) => {
  const { t } = useTranslation('labels');
  const { state } = React.useContext(AuthContext);

  const assignSegments = (xs) =>
    compact(
      flatten(
        map(xs, (page) => {
          if (!page?.index) return null;
          return page;
        }),
      ),
    );

  const makePage = (page) => ({
    ...page,
    label: t(page.resourceName),
    segments: merge(
      {},
      page.segments,
      get(state, `filters.${page.collectionName}`),
    ),
    to: makePath(page),
    visible: page.collectionName
      ? useAuth(page.collectionName)?.inClient
      : true,
  });

  return groupBy(
    map(assignSegments(pages), makePage).flat(),
    (v) => v.parent,
  );
};
