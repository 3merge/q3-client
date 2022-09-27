import React from 'react';
import { invoke } from 'lodash';
import useSegmentsUpdate from '../useSegmentsUpdate';

const useDomTreeToSegments = () => {
  const ref = React.useRef();
  const { reorder } = useSegmentsUpdate();
  const selector = '[data-segment="true"]';

  const getNodeId = (node) =>
    invoke(node, 'getAttribute', 'data-id') || null;

  return {
    onEnd() {
      try {
        reorder(
          Array.from(
            ref.current.querySelectorAll(selector),
          ).map((node) => ({
            folderId: getNodeId(
              node.parentNode.closest(selector),
            ),
            id: getNodeId(node),
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
