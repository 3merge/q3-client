import React from 'react';

export default React.createContext();

export const Definitions = React.createContext(
  {
    collectionName: null,
    resourceNamePlural: null,
    resourceName: null,
  },
  (prevState, nextState) => {
    return Number(
      !(
        JSON.stringify(prevState) ===
        JSON.stringify(nextState)
      ),
    );
  },
);

export const Dispatcher = React.createContext(
  {
    create: null,
    get: null,
    remove: null,
    update: null,
  },
  () => 0,
);

export const Store = React.createContext({
  data: {},
});
