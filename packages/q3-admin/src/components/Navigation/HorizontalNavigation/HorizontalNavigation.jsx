import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import NavigationLink from '../../NavigationLink';
import withNavigation from '../withNavigation';

const HorizontalNavigation = ({ renderMenu }) => {
  return renderMenu();
};

const MyList = ({ children }) => {
  return (
    <List style={{ display: 'flex' }}>{children}</List>
  );
};

const MyListItem = (props) => {
  const [isActive, setIsActive] = React.useState(false);
  const {
    label,
    icon,
    isExpanded,
    role,
    children = null,
    to,
  } = props;

  const handleMouseOver = () => setIsActive(true);
  const handleMouseLeave = () => setIsActive(false);

  const renderExpandedIcon = () => {
    if (typeof isExpanded !== 'boolean') return null;
    return isExpanded ? (
      <ExpandLess style={{}} />
    ) : (
      <ExpandMore style={{}} />
    );
  };

  return (
    <ListItem style={{ display: 'block' }}>
      <Box
        display="flex"
        alignItems="center"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {renderExpandedIcon()}
        <NavigationLink to={to} label={label} icon={icon} />
      </Box>
      {children != null && isActive && (
        <Box position="absolute">
          {children != null && children}
        </Box>
      )}
    </ListItem>
  );
};

export default withNavigation(
  MyList,
  MyListItem,
)(HorizontalNavigation);
