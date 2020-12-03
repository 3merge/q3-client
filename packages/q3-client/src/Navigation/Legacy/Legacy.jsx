import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  List,
  ListItem,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { withNavigation } from 'q3-hoc';

const NavigationList = ({ children }) => {
  return <List style={{ padding: 0 }}>{children}</List>;
};

NavigationList.propTypes = {
  children: PropTypes.node.isRequired,
};

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
        paddingTop: '4px',
        paddingBottom: '4px',
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        className={isExpanded ? 'q3NavExpanded' : ''}
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
                  : '18px',
            }}
          />
        )}
        <Button
          color="inherit"
          onClick={onClick}
          role={role || 'button'}
          className={isSelected ? 'q3NavSelected' : ''}
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

export default withNavigation(
  NavigationList,
  NavigationListItem,
);
