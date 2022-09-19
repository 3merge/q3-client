import React from 'react';
import { useMatch } from '@reach/router';
import { useToggle } from 'useful-state';
import { isObject } from 'lodash';

const useToggleWithLocationDefaults = (path) => {
  const matches = isObject(useMatch(path));
  const toggleProps = useToggle();

  React.useEffect(() => {
    if (matches) toggleProps.open();
    else toggleProps.close();
  }, [matches]);

  return {
    ...toggleProps,
    matches,
  };
};

export default useToggleWithLocationDefaults;
