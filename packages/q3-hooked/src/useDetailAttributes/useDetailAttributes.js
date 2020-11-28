import React from 'react';
import { useTranslation } from 'react-i18next';
import { getMeta } from 'q3-ui/lib/timeline';
import Comparisons from 'comparisons';
import { array } from 'q3-ui-helpers';
import { Dispatcher, Store } from '../context';

const getAuthorship = getMeta('createdBy', 'createdAt');
const getLastModification = getMeta(
  'lastModifiedBy',
  'updatedAt',
);

export default () => {
  const { t } = useTranslation();
  const dispatchers = React.useContext(Dispatcher);
  const { data } = React.useContext(Store);
  const createdBy = getAuthorship(data);
  const updatedBy = getLastModification(data);

  return {
    createdBy,
    updatedBy,
    data,
    dispatchers,
    t,

    build: (fn) => fn(data, dispatchers, t),
    sanitize: (a) =>
      array.is(a).reduce((acc, cur) => {
        if (
          cur.conditions &&
          !new Comparisons(cur.conditions).eval(data)
        )
          return acc;

        const x = {
          ...cur,
          title: t(`titles:${cur.title}`),
          content: React.createElement(cur.component, {
            data,
            dispatchers,
            t,
          }),
        };
        return [...acc, x];
      }, []),
  };
};
