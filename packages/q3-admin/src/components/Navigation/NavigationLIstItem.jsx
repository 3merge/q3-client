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
    return isExpanded ? (
      <ExpandLess style={{}} />
    ) : (
      <ExpandMore style={{}} />
    );
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
        {Icon && (
          <Icon
            color="inherit"
            style={{
              display: 'block',
              marginLeft:
                typeof isExpanded === 'boolean'
                  ? 0
                  : '16px',
            }}
          />
        )}
        <Button
          color="inherit"
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
      {isExpanded && children != null && children}
    </ListItem>
  );
};

NavigationListItem.defaultProps = {
  isSelected: false,
  role: '',
  children: null,
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
  children: PropTypes.any,
};

export default NavigationListItem;
