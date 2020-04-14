import React from 'react';
import { useResults } from 'q3-ui-helpers/lib/hooks';

export default (service, term) => {
  const [prev, setPrev] = React.useState('');
  const { run, ...rest } = useResults(service, term);

  React.useEffect(() => {
    if (prev !== term) {
      setPrev(term);
      run();
    }
  }, [term]);

  return rest;
};
