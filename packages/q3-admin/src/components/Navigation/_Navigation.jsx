import React from 'react';
import {
  List,
  ListItem,
  Button,
  Box,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import withNavigation from './withNavigation';

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
  const renderExpandedIcon = () => {
    if (typeof isExpanded !== 'boolean') return null;
    return isExpanded ? <ExpandLess /> : <ExpandMore />;
  };

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
        {renderExpandedIcon()}
        {Icon && <Icon color="inherit" />}
        <Button
          onClick={onClick}
          role={role || 'button'}
          className={isSelected ? 'navIsSelected' : ''}
          style={{ textTransform: 'none' }}
        >
          {label}
        </Button>
      </Box>
      {children}
    </ListItem>
  );
};

export default withNavigation(List, MyListItem)(TestNav);
