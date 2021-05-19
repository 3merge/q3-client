import React from 'react';
import {
  map,
  filter,
  sortBy,
  uniqBy,
  isEqual,
} from 'lodash';

export const Context = React.createContext({}, () => false);

export const ActionsContext = React.createContext(
  [],
  (a = [], b = []) =>
    !isEqual(map(a, 'label'), map(b, 'label')),
);

const ActionBar = ({ children }) => {
  const [items, setItems] = React.useState([]);

  const add = (newItems) =>
    setItems((prevState) =>
      uniqBy([...prevState, ...newItems], 'label'),
    );

  const remove = (oldItems) => {
    const targets = map(oldItems, 'label');

    setItems((prevState) =>
      filter(
        prevState,
        (item) => !targets.includes(item.label),
      ),
    );
  };

  return (
    <ActionsContext.Provider value={sortBy(items, 'sort')}>
      <Context.Provider
        value={{
          add,
          remove,
        }}
      >
        {children}
      </Context.Provider>
    </ActionsContext.Provider>
  );
};

export default ActionBar;
