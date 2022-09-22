import React from 'react';
import { get } from 'lodash';
import useSegmentsUpdate from '../useSegmentsUpdate';

const useDomTreeToSegments = () => {
  const ref = React.useRef();
  const { reorder } = useSegmentsUpdate();
  const selector = '[data-segment="true"]';

  return {
    onEnd() {
      try {
        reorder(
          Array.from(
            ref.current.querySelectorAll(selector),
          ).map((node) => ({
            folderId: get(
              node.parentNode.closest(selector),
              'id',
              null,
            ),
            id: node.id,
          })),
        );
      } catch (e) {
        // noop
      }
    },
    ref,
  };
};

export default useDomTreeToSegments;
