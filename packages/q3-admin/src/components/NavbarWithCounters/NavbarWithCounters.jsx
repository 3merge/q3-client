import React from 'react';
import { Navbar as NavbarListComponent } from 'q3-ui-navbar';
import { isObject, isFunction } from 'lodash';
import { usePages } from '../../hooks';
import ServerSideEventsContext from '../../containers/ServerSideEventsContext';

export const mergeCountersWithPages =
  (counters) => (pagePayload) => {
    if (!isObject(counters) || !isObject(pagePayload))
      return pagePayload;

    const hasId = (xs) => {
      if (counters[xs?.id])
        Object.assign(xs, {
          badge: counters[xs.id],
        });
    };

    const recurseSegments = (xs) => {
      if (Array.isArray(xs?.segments))
        xs.segments.forEach((item) => {
          hasId(item);
          recurseSegments(item);
        });
    };

    hasId(pagePayload);
    recurseSegments(pagePayload);
    return pagePayload;
  };

const NavbarWithCounters = React.memo(
  // eslint-disable-next-line
  ({ pages, reorder }) => {
    const sse = React.useContext(ServerSideEventsContext);
    const customizer = mergeCountersWithPages(
      sse?.counters,
    );

    const reorderNavBarPages = (xs) =>
      isFunction(reorder) ? reorder(xs) : xs;

    return (
      <NavbarListComponent
        customizer={customizer}
        items={reorderNavBarPages(usePages(pages))}
      />
    );
  },
);

export default NavbarWithCounters;
