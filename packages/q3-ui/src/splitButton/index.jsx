import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from '@material-ui/core';
import { ArrowDropDown } from '@material-ui/icons';

const SplitButton = () => {};

/** Dropdown menu */
function MenuListWrapper({ id, items, innerRef, render }) {
  const curry = React.useCallback(
    (a, b) => (e) => {
      a(e);
      b(e);
    },
    [],
  );

  return (
    <PopperState
      id={id}
      innerRef={innerRef}
      renderOutside={render}
      renderInside={({ handleClose }) => (
        <MenuList>
          {items.map(({ label, onClick }) => (
            <MenuItem
              key={label}
              onClick={curry(handleClose, onClick)}
            >
              {label}
            </MenuItem>
          ))}
        </MenuList>
      )}
    />
  );
}

const id = 'button-split-options';

const invokeHandlerByIndex = (opts = [], ind = 0) => () =>
  typeof opts[ind] === 'object' && 'handler' in opts[ind]
    ? opts[ind].handler()
    : null;

export default function ButtonSplit({ options }) {
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(
    0,
  );

  /** Dispatch current click handler */
  const handleClick = React.useCallback(() => {
    options[selectedIndex].handler();
  }, [options, selectedIndex]);

  /** Filter options against current state */
  const getOptions = React.useCallback(
    () =>
      options
        .map((option, index) => ({
          onClick: () => setSelectedIndex(index),
          ...option,
        }))
        .filter((_, index) => index !== selectedIndex),
    [options, selectedIndex],
  );

  return (
    <MenuListWrapper
      id={id}
      innerRef={anchorRef}
      items={getOptions()}
      render={(toggle, isOpen) => (
        <ButtonGroup
          aria-label="New order action list"
          variant="contained"
          color="primary"
          ref={anchorRef}
        >
          <Button
            size="large"
            onClick={invokeHandlerByIndex(
              options,
              selectedIndex,
            )}
            style={{ borderRight: '1px solid #FFF' }}
          >
            {options[selectedIndex].label}
          </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            aria-owns={isOpen ? id : undefined}
            aria-haspopup="true"
            onClick={toggle}
          >
            <ArrowDropDown />
          </Button>
        </ButtonGroup>
      )}
    />
  );
}

ButtonSplit.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      handler: PropTypes.func,
      label: PropTypes.string,
    }),
  ).isRequired,
};
