import React from 'react';
import { Link } from '@reach/router';
import { isFunction, merge, size } from 'lodash';
import useToggleWithLocationDefaults from '../useToggleWithLocationDefaults';

const useNavbarListItemProps = ({
  enableSegments,
  menuId,
  openContextMenu,
  segmentId,
  segments,
  to,
}) => {
  const { state, toggle, matches } =
    useToggleWithLocationDefaults(to);

  const onContextMenu = React.useCallback(
    (e) => {
      if (matches && isFunction(openContextMenu)) {
        e.preventDefault();
        openContextMenu(e);
      }
    },
    [matches, openContextMenu],
  );

  return React.useMemo(() => {
    const output = {
      hasSegments: size(segments) > 0 && enableSegments,
      matches,
      state,
    };

    if (output.hasSegments)
      return {
        ...output,
        'aria-haspopup': 'true',
        'aria-expanded': state,
        'aria-controls': [menuId, segmentId].join(','),
        onClick: toggle,
        onContextMenu,
      };

    return merge(
      enableSegments
        ? {
            onContextMenu,
          }
        : {},
      output,
      {
        component: Link,
        disabled: !to,
        to: to || '/',
      },
    );
  }, [
    enableSegments,
    matches,
    onContextMenu,
    segments,
    state,
    to,
  ]);
};

export default useNavbarListItemProps;
