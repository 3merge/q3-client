import React from 'react';
import PropTypes from 'prop-types';
import { ListItem as MuiListItem } from '@material-ui/core';
import ListItemContent from '../ListItemContent';
import withFileIcon from '../withFileIcon';
import withDrag from '../withDrag';
import withContextMenu from '../withContextMenu';
import withSelected from '../withSelected';

export const ListItem = React.forwardRef(
  (
    {
      icon: Icon,
      id,
      isItemSelected,
      name,
      onClick,
      onContextMenu,
      onSelect,
      size,
    },
    ref,
  ) => (
    <MuiListItem
      button
      data-id={id}
      selected={isItemSelected}
      className="q3-file"
      component="li"
      dense
      onClick={onSelect}
      onDoubleClick={onClick}
      onContextMenu={onContextMenu}
      ref={ref}
      style={{
        paddingLeft: 0,
      }}
    >
      <ListItemContent
        name={name}
        onClick={onContextMenu}
        size={size}
      >
        <Icon />
      </ListItemContent>
    </MuiListItem>
  ),
);

ListItem.defaultProps = {
  isItemSelected: false,
  size: 0,
};

ListItem.propTypes = {
  classes: PropTypes.shape({
    item: PropTypes.string,
  }).isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  isItemSelected: PropTypes.bool,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onContextMenu: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default withContextMenu(
  withSelected(withFileIcon(withDrag(ListItem))),
);
