import React from 'react';
import { normalize } from '../utils';

const useCurrent = () => {
  const [current, setCurrent] = React.useState(null);

  return {
    current,
    change(str) {
      setCurrent(normalize(str));
    },
  };
};

export default useCurrent;
