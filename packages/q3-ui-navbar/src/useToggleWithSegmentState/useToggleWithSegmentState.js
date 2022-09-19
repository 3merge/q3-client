import React from 'react';
import { useToggle } from 'useful-state';

const useToggleWithSegmentState = ({ applied = false }) => {
  const toggleProps = useToggle();

  React.useEffect(() => {
    if (applied) toggleProps.open();
    else toggleProps.close();
  }, [applied]);

  return toggleProps;
};

export default useToggleWithSegmentState;
