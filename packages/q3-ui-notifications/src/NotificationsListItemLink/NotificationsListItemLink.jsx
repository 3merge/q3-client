import React from 'react';
import { Link, ListItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import useStyle from './styles';

const NotificationsListItemLink = ({
  children,
  onClick,
  url,
  ...props
}) => (
  <ListItem
    {...props}
    className={useStyle().root}
    component={Link}
    href={url}
    onClick={onClick}
  >
    {children}
  </ListItem>
);

NotificationsListItemLink.defaultProps = {
  onClick: () => null,
  url: undefined,
};

NotificationsListItemLink.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  url: PropTypes.string,
};

export default NotificationsListItemLink;
