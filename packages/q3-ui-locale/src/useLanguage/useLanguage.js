import React from 'react';
import Context from '../context';

const useLanguage = () => {
  const r = React.useContext(Context);

  return r;
};
export default useLanguage;
