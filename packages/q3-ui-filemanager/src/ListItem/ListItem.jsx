import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import withFileIcon from '../withFileIcon';
import { toMbs } from '../utils';

export const ListItem = ({
  icon: Icon,
  name,
  onClick,
  onContextMenu,
  size,
}) => (
  <MuiListItem
    button
    component="li"
    dense
    onClick={onClick}
    onContextMenu={onContextMenu}
  >
    <ListItemAvatar>
      <Avatar style={{ background: 'transparent' }}>
        <Icon />
      </Avatar>
    </ListItemAvatar>
    <ListItemText primary={name} secondary={toMbs(size)} />
    <ListItemSecondaryAction>
      <IconButton
        aria-label="file options"
        onClick={onContextMenu}
      >
        <MoreHorizIcon />
      </IconButton>
    </ListItemSecondaryAction>
  </MuiListItem>
);

ListItem.defaultProps = {
  size: 0,
};

ListItem.propTypes = {
  icon: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number,
};

export default withFileIcon(ListItem);
