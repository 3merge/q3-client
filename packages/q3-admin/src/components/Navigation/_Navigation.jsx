import React from 'react';
import {
  List,
  ListItem,
  Button,
  Box,
} from '@material-ui/core';
import recursiveMenu from './recursiveMenu';

const TestNav = ({ renderMenu }) => {
  return (
    <div>
      <p>My list</p>
      {renderMenu()}
    </div>
  );
};

const MyListItem = ({
  label,
  onClick,
  isExpanded,
  isSelected,
  children,
  to,
  icon: Icon,
  role,
}) => {
  return (
    <ListItem
      style={{
        display: 'block',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        className={isExpanded ? 'natIsExpanded' : ''}
      >
        {Icon && <Icon color="inherit" />}
        <Button
          onClick={onClick}
          role={role || 'button'}
          className={isSelected ? 'navIsSelected' : ''}
        >
          {label}
        </Button>
      </Box>
      {children}
    </ListItem>
  );
};

export default recursiveMenu(List, MyListItem)(TestNav);
