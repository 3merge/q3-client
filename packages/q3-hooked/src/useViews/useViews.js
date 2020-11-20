import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { Definitions } from '../context';

const removeForwardSlash = (str) =>
  typeof str === 'string' && str.length && str !== '/'
    ? str.substring(1)
    : '/';

const useViews = (views = []) => {
  const { resourceName, id } = React.useContext(
    Definitions,
  );

  const { t } = useTranslation('labels');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const index = Array.isArray(views)
    ? views.findIndex(
        ({ to }) => to !== '/' && pathname.includes(to),
      )
    : -1;

  const makeRelativeLink = (to) =>
    [resourceName, id, removeForwardSlash(to)].join('/');

  return {
    value: index !== -1 ? index : 0,
    links: views.map(({ label, to }) => ({
      label: t(label),
      onClick: () => navigate(makeRelativeLink(to)),
      role: 'link',
    })),
  };
};

export default useViews;
