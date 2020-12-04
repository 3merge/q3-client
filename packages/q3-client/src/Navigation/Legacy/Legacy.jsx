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
import useStyles from './useStyles';

const NavigationList = ({ children }) => {
  return <List style={{ padding: 0 }}>{children}</List>;
};

NavigationList.propTypes = {
  children: PropTypes.node.isRequired,
};

const ExpandedIcon = ({ isExpanded }) => {
  if (typeof isExpanded !== 'boolean') return null;
  return isExpanded ? <ExpandLess /> : <ExpandMore />;
};

ExpandedIcon.defaultProps = {
  isExpanded: null,
};

ExpandedIcon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  isExpanded: PropTypes.any,
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
  const cls = useStyles({ isSelected });
  return (
    <ListItem className={cls.listItem}>
      <Box display="flex" alignItems="center">
        <ExpandedIcon isExpanded={isExpanded} />
        {Icon && (
          <Icon color="inherit" className={cls.icon} />
        )}
        <Button
          color="inherit"
          onClick={onClick}
          role={role || 'button'}
          className={cls.button}
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
