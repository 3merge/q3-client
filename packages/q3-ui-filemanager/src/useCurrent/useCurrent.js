import React from 'react';
import { compact } from 'lodash';

const useCurrent = () => {
  const [current, change] = React.useState(null);

  const prependCurrent = (v) =>
    compact([current, v]).join('/');

  return {
    change,
    current,
    prependCurrent,
  };
};

export default useCurrent;
