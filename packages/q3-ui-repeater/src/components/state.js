import React from 'react';

export const ActionContext = React.createContext({
  id: null,
});

export default React.createContext({
  search: {
    value: '',
  },
});
