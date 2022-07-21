import React from 'react';
import ThreadContextHttp from '../ThreadContextHttp';

const usePin = (id, currentValue = false) => {
  const { patch } = React.useContext(ThreadContextHttp);
  const isPinned = currentValue === true;

  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    return patch(id)({
      pin: !isPinned,
    });
  };

  return {
    isPinned,
    toggle,
  };
};

export default usePin;
