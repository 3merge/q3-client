import React from 'react';
import useClientDimensions from '../useClientDimensions';

const withClientDimensions = (Component) =>
  React.forwardRef((props, ref) => {
    const dimensions = useClientDimensions();

    return (
      <Component
        {...props}
        {...dimensions}
        ref={ref}
        videoConstraints={dimensions}
      />
    );
  });

export default withClientDimensions;
