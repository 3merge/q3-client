import React from 'react';
import Context from '../Context';

const useClientDimensions = () => {
  const { width = 0, height = 0 } =
    React.useContext(Context);
  return {
    width,
    height,
  };
};

export default useClientDimensions;
