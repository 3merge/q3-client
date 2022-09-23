import React from 'react';
import PropTypes from 'prop-types';
import { Menu as MuiMenu } from '@material-ui/core';
import { map, size } from 'lodash';
import { useOpen } from 'useful-state';
import MenuItem from '../MenuItem';
import SegmentsContext from '../SegmentsContext';
import useStyle from './styles';

const Menu = ({ children, id, items }) => {
  const {
    anchorEl,
    close,
    isOpen,
    open: handleOpen,
  } = useOpen();
  const cls = useStyle({
    isOpen,
  });

  const { enabled } = React.useContext(SegmentsContext);
  const open = React.useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!enabled) return;
      handleOpen(e);
    },
    [enabled],
  );

  const getLiRoot = () => {
    try {
      return anchorEl?.parentNode.closest('li');
    } catch (e) {
      return anchorEl;
    }
  };

  return [
    children({
      className: cls.wrapper,
      open,
    }),
    size(items) > 0 && enabled && (
      <MuiMenu
        anchorEl={getLiRoot()}
        id={id}
        open={isOpen}
        onClose={close}
        onContextMenu={(event) => {
          event.preventDefault();
        }}
        onMouseDown={close}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {map(items, (item, idx) => (
          <MenuItem
            {...item}
            key={`menu-${idx}-${item.label}`}
          />
        ))}
      </MuiMenu>
    ),
  ];
};

Menu.defaultProps = {
  items: [],
};

Menu.propTypes = {
  children: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      checked: PropTypes.bool,
      label: PropTypes.string,
      nested: PropTypes.bool,
    }),
  ),
};

export default Menu;
