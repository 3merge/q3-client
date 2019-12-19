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

function PopperState({
  innerRef,
  id,
  renderInside,
  renderOutside,
}) {
  const [open, setOpen] = React.useState(false);

  /** Open and close the menu */
  const handleToggle = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  /** Close the menu via ref */
  const handleClose = React.useCallback(
    (event) => {
      if (
        innerRef.current &&
        innerRef.current.contains(event.target)
      ) {
        return;
      }
      setOpen(false);
    },
    [innerRef],
  );

  return (
    <>
      {renderOutside(handleToggle, open)}
      <Popper
        open={open}
        anchorEl={innerRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom'
                  ? 'center top'
                  : 'center bottom',
            }}
          >
            <Paper id={id} elevation={5}>
              <ClickAwayListener onClickAway={handleClose}>
                {renderInside({ handleClose })}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

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

export default function ButtonSplit({ options }) {
  const [selectedIndex, setSelectedIndex] = React.useState(
    0,
  );
  const anchorRef = React.useRef(null);
  const id = 'button-split-options';

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
            onClick={handleClick}
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
