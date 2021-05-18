import React from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
} from '@material-ui/core';
import { map, filter, sortBy, uniqBy } from 'lodash';

export const Context = React.createContext({}, () => false);

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
    <Context.Provider
      value={{
        add,
        remove,
      }}
    >
      {children}
      <BottomNavigation style={{ height: 65 }}>
        {map(
          sortBy(items, 'sort'),
          ({ icon: Icon, label, ...rest }) => (
            <BottomNavigationAction
              label={label}
              icon={<Icon />}
              {...rest}
            />
          ),
        )}
      </BottomNavigation>
    </Context.Provider>
  );
};

export default ActionBar;
