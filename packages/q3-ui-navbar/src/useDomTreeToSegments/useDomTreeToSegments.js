import React from 'react';
import useSegmentsUpdate from '../useSegmentsUpdate';

const useDomTreeToSegments = () => {
  const ref = React.useRef();
  const { reorder } = useSegmentsUpdate();

  return {
    onEnd() {
      try {
        reorder(
          Array.from(
            ref.current.querySelectorAll(
              '[data-segment="true"]',
            ),
          ).map((node) => ({
            folderId: node.parentNode.closest(
              '[data-segment="true"]',
            )?.id,
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
