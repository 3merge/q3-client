import React from 'react';
import PropTypes from 'prop-types';
import { Box, ListItem, Button } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const NavigationListItem = ({
  label,
  onClick,
  isExpanded,
  isSelected,
  children,
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
          style={{
            textTransform: 'none',
            alignItems: 'left',
          }}
        >
          {label}
        </Button>
      </Box>
      {children}
    </ListItem>
  );
};

NavigationListItem.defaultProps = {
  isSelected: false,
  role: '',
};

NavigationListItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  role: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  isExpanded: PropTypes.bool,
  // eslint-disable-next-line react/require-default-props
  icon: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
};

export default NavigationListItem;
