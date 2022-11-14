import React from 'react';
import { ListItemIcon, Checkbox } from '@material-ui/core';
import PropTypes from 'prop-types';
import BulkContext from '../BulkContext';

const NotificationsListItemCheckbox = ({ id }) => {
  const { isActive, toggle } =
    React.useContext(BulkContext);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(id);
  };

  return (
    <ListItemIcon>
      <Checkbox
        checked={isActive(id)}
        onClick={handleClick}
      />
    </ListItemIcon>
  );
};

NotificationsListItemCheckbox.defaultProps = {};

NotificationsListItemCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
};

export default NotificationsListItemCheckbox;
