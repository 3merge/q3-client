import React from 'react';
import { useLocation, useNavigate } from '@reach/router';
import { useTranslation } from 'react-i18next';
import { Definitions } from '../context';

const getPath = (i, key) => (i !== 0 ? `/${key}` : '/');

const removeForwardSlash = (str) =>
  typeof str === 'string' && str.length && str !== '/'
    ? str.substring(1)
    : '/';

const mapToNestedRoute = (a = []) =>
  React.Children.map(a, (child, i) => {
    const str = String(child.props.name).toLowerCase();

    return {
      label: str,
      to: getPath(i, str),
      component: () => child,
    };
  });

const useViews = (args) => {
  const views = !Array.isArray(args)
    ? mapToNestedRoute(args)
    : args;

  const { resourceName, id } = React.useContext(
    Definitions,
  );

  const { t } = useTranslation('labels');
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const makeRelativeLink = (to) =>
    [resourceName, id, removeForwardSlash(to)].join('/');

  const makeViewShape = (label, el) => ({
    to: `/${label}`,
    component: () =>
      React.createElement(el, {
        name: label,
      }),
    label,
  });

  const makeView = React.useCallback(
    (label, el) => ({
      to: `/${label}`,
      component: () =>
        React.createElement(el, {
          name: label,
        }),
      label,
    }),
    [],
  );

  const add = (obj = {}) =>
    Object.entries(obj).forEach(([key, value]) => {
      views.push(makeView(key, value));
    });

  const links = views.map(({ label, to }) => ({
    label: t(label),
    onClick: () => navigate(makeRelativeLink(to)),
    role: 'link',
  }));

  const findInViews = (fn) =>
    Array.isArray(views)
      ? views.findIndex(({ to }) => fn(to))
      : -1;

  const currentIndex = findInViews(
    (to) => to !== '/' && pathname.includes(to),
  );

  const hasRoot = findInViews((to) => to === '/') === -1;
  const value = currentIndex !== -1 ? currentIndex : 0;

  return {
    add,
    makeRelativeLink,
    makeViewShape,
    hasRoot,
    value,
    links,
    views,
  };
};

export default useViews;
