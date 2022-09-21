import React from 'react';
import useDomTreeToSegments from '../useDomTreeToSegments';

const withDomTreeToSegments = (Component) => (props) => {
  const { onEnd, ref } = useDomTreeToSegments();

  return (
    <div ref={ref}>
      <Component onEnd={onEnd} {...props} />
    </div>
  );
};

export default withDomTreeToSegments;
