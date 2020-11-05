import React from 'react';

export default React.createContext();

export const Filters = React.createContext({
  getOptions: () => [],
  fetching: false,
  fields: {},
});

export const Options = React.createContext({
  all: true,
});

export const Definitions = React.createContext(
  {
    collectionName: null,
    resourceNamePlural: null,
    resourceName: null,
  },
  (prevState, nextState) =>
    Number(
      !(
        JSON.stringify(prevState) ===
        JSON.stringify(nextState)
      ),
    ),
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
  hasInitialized: false,
  hasEntered: false,
  hasExited: false,
  data: {},
});
