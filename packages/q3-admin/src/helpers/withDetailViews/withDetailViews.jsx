import React from 'react';
import { AuthContext } from 'q3-ui-permissions';
import { get, isFunction } from 'lodash';
import ViewNotAllowed from '../../components/ViewNotAllowed';
import { Store } from '../../containers/state';
import { getPath } from '../../components/utils';

const withDetailViews =
  (Component) =>
  ({ children, protectView, ...props }) => {
    const { data = {} } = React.useContext(Store);
    const auth = React.useContext(AuthContext);

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
        }).filter((el) =>
          isFunction(protectView)
            ? protectView(
                el.label,
                data,
                get(auth, 'state.profile'),
              )
            : true,
        )
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
