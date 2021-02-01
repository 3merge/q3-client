import React from 'react';
import PropTypes from 'prop-types';
import {
  IconButton,
  ListItem,
  Menu,
} from '@material-ui/core';

const CollapsedListItem = ({
  children,
  isExpanded,
  icon: Icon,
}) => {
  return (
    <ListItem
      style={{
        display: 'block',
        paddingTop: '4px',
        paddingBottom: '4px',
      }}
    >
      {Icon && (
        <IconButton color="inherit">
          <Icon
            color="inherit"
            style={{
              display: 'block',
            }}
          />
        </IconButton>
      )}

      {isExpanded && children != null && children}
    </ListItem>
  );
};

CollapsedListItem.defaultProps = {};

CollapsedListItem.propTypes = {
  // eslint-disable-next-line react/require-default-props
  icon: PropTypes.node,
};

export default CollapsedListItem;
