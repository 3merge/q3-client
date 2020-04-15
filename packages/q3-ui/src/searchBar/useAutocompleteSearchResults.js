import React from 'react';
import { get, invoke } from 'lodash';
import { browser } from 'q3-ui-helpers';
import { useResults } from 'q3-ui-helpers/lib/hooks';

const { isBrowserReady } = browser;

const isActive = (ref) => {
  if (!isBrowserReady()) return false;
  return invoke(
    get(ref, 'current.classList'),
    'contains',
    'Mui-focused',
  );
};

export default (service, term, ref) => {
  const [prev, setPrev] = React.useState('');
  const { run, ...rest } = useResults(service, term);

  React.useEffect(() => {
    if (prev !== term && isActive(ref)) {
      setPrev(term);
      run();
    }
  }, [term]);

  return rest;
};
