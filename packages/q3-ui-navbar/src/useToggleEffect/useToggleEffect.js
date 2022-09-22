import React from 'react';
import { useToggle } from 'useful-state';

const useToggleEffect = (bool) => {
  const toggleProps = useToggle();

  React.useEffect(() => {
    if (bool) toggleProps.open();
    else toggleProps.close();
  }, [bool]);

  return toggleProps;
};

export default useToggleEffect;
