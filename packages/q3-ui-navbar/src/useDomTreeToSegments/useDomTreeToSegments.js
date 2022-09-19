import React from 'react';
import { forEach } from 'lodash';

const useDomTreeToSegments = () => {
  const ref = React.useRef();

  return {
    onEnd() {
      const segs = [];

      forEach(
        ref.current.querySelectorAll(
          '[data-segment="true"]',
        ),
        (node) => {
          segs.push({
            folderId: node.parentNode.closest(
              '[data-segment="true"]',
            )?.id,
            id: node.id,
          });
        },
      );

      console.log(segs);
      /**
       * UPDATE BY IDS...
       */
    },
    ref,
  };
};

export default useDomTreeToSegments;
