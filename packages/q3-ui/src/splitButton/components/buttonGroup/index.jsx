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
