import React from 'react';
import { useOpen } from 'useful-state';
import {
  isFunction,
  map,
  size,
  forEach,
  invoke,
} from 'lodash';
import { Menu, MenuItem } from '@material-ui/core';
import Dialog from 'q3-ui-dialog';
import { State } from 'q3-ui-exports';

const TableActionsDropdown = ({ children, items }) => {
  const { open, isOpen, close, anchorEl } = useOpen();
  const { checked = [] } = React.useContext(State);

  return size(items) ? (
    <>
      {children(open)}
      <Menu
        anchorEl={anchorEl}
        onClose={() => {
          close();
          forEach(items, (item) => {
            invoke(item, 'onClose');
          });
        }}
        open={isOpen}
      >
        {map(items, (item) => {
          const handleClick = (fn) => (evt) => {
            try {
              evt.preventDefault();
              fn(checked);
              close(evt);
            } catch (e) {
              // noop
            }
          };

          const { element } = item;
          const renderContent = isFunction(element)
            ? element
            : () => null;

          return item.dialog ? (
            <Dialog
              key={item.label}
              renderContent={renderContent}
              renderTrigger={(onClick) => (
                <MenuItem
                  disabled={!element}
                  onClick={handleClick(onClick)}
                >
                  {item.label}
                </MenuItem>
              )}
              title={item.label}
            />
          ) : (
            <MenuItem
              key={item.label}
              onClick={handleClick(item.onClick)}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  ) : null;
};

export default TableActionsDropdown;
