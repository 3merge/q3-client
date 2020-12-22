import React from 'react';

const useSelect = (initialValue = 0) => {
  const [state, setState] = React.useState(initialValue);
  const handleChange = (e) => setState(e.target.value);

  return [state, handleChange];
};

export default useSelect;
