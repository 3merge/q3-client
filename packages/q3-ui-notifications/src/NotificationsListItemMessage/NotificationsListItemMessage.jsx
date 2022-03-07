import React from 'react';
import { ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import useSeen from '../useSeen';

const NotificationsListItemMessage = ({
  children,
  acknowledge,
  hasSeen,
  id,
  ...props
}) => (
  <ListItem
    component="div"
    ref={useSeen({ id, hasSeen }, acknowledge)}
    {...props}
  >
    {children}
  </ListItem>
);

NotificationsListItemMessage.defaultProps = {
  hasSeen: false,
};

NotificationsListItemMessage.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string.isRequired,
  hasSeen: PropTypes.bool,
  acknowledge: PropTypes.func.isRequired,
};

export default NotificationsListItemMessage;
