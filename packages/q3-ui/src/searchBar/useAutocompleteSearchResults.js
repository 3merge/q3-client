import React from 'react';
import { useResults } from 'q3-ui-helpers/lib/hooks';

export default (service, term) => {
  const { run, ...rest } = useResults(service, term);

  React.useEffect(() => {
    run();
  }, [term]);

  return rest;
};
