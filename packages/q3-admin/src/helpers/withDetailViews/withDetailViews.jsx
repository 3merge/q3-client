import React from 'react';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import { useAppContext } from '../../hooks';
import { Store } from '../../containers/state';
import { getPath } from '../../components/utils';

const withDetailViews =
  (Component) =>
  ({ children, ...props }) => {
    const { check } = useAppContext();
    const { data = {} } = React.useContext(Store);

    const checkByLabel = (el) => check(el.label, el, data);

    const toLowerCase = (el) =>
      String(el?.props?.name).toLowerCase();

    const hasAnIndex = (a) =>
      a.findIndex((item) => item.to === '/') === -1;

    const views = children
      ? React.Children.map(children, (child, i) => {
          const str = toLowerCase(child);

          return {
            component: () => child,
            label: str,
            to: getPath(i, str),
          };
        }).filter(checkByLabel)
      : [];

    return React.useMemo(
      () =>
        hasAnIndex(views) ? (
          <ViewNotAllowed />
        ) : (
          <Component views={views} {...props} />
        ),
      [views],
    );
  };

export default withDetailViews;
